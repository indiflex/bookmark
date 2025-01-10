import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';

export default async function About() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return (
    <>
      <h1 className='text-2xl'>About me : {user?.nickname}</h1>
    </>
  );
}
