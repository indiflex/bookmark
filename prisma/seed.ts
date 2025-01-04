import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sico = await prisma.user.upsert({
    where: { email: 'indiflex.sico@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.sico@gmail.com',
      nickname: 'sico',
      Books: {
        create: {
          title: 'sico first book',
          withdel: false,
          Marks: {
            create: {
              url: 'https://naver.com',
              title: 'Naver',
              image:
                'https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png',
              descript: 'seeding...',
            },
          },
        },
      },
    },
  });

  const indiflex = await prisma.user.upsert({
    where: { email: 'indiflex.corp@gmail.com' },
    update: {},
    create: {
      email: 'indiflex.corp@gmail.com',
      nickname: 'indiflex',
      Books: {
        create: [
          {
            title: 'indiflex first book',
            withdel: false,
          },
          {
            title: 'indiflex second book',
            withdel: true,
          },
        ],
      },
    },
  });

  console.log({ sico, indiflex });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
