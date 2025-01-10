import Image from 'next/image';
import { auth, signIn } from '@/lib/auth';
import prisma, { query } from '@/lib/db';
import PassButton from '@/components/pass-button';
import { Button } from '@/components/ui/button';
import GithubLogin from './github-login';
import KakaoLogin from './kakao-login';

type User = {
  id: number;
  nickname: string;
  email: string;
};

export type SNS = 'google' | 'github' | 'kakao' | 'naver';
type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
export default async function Login({ searchParams: { callbackUrl } }: Props) {
  const session = await auth();
  console.log('🚀 login - session:', session);

  const users1 = await query<User>('select * from User');
  console.log('🚀  users1:', users1?.length);
  const users = await prisma.user.findMany();

  const googleLogin = async (formData: FormData) => {
    'use server';
    const service = formData.get('service') as string;
    await signIn(service);
  };

  const snsLogin = async (service: SNS = 'google') => {
    'use server';
    console.log('snsLogin>>>', service, callbackUrl);
    await signIn(service, { redirectTo: callbackUrl });
  };

  return (
    <div className='borderx pt-5 text-center'>
      <h1 className='text-2xl mb-3 text-center'>Login</h1>
      <ul className='text-green-500'>
        {users.map((user) => (
          <li key={user.id}>
            {user.id}. {user.nickname}
          </li>
        ))}
      </ul>
      <div className='w-64 mx-auto'>
        <form action={googleLogin} className='mb-3'>
          <input type='hidden' name='service' value='google' />
          <ul className='space-y-3'>
            <li>
              <Button type='submit' className='w-full flex justify-between'>
                <Image
                  width='24'
                  height='24'
                  src='https://authjs.dev/img/providers/google.svg'
                  alt='login with google'
                />
                Sign In with Google
              </Button>
            </li>
            <li>
              <GithubLogin githubLogin={snsLogin} />
            </li>
          </ul>
        </form>

        <PassButton
          label='Sign In with Naver'
          action={async () => {
            'use server';
            await snsLogin('naver');
          }}
          className='w-full mb-3 flex justify-between'
        />
        <KakaoLogin login={snsLogin} />
        <Image
          width='300'
          height={500}
          alt='xx'
          src='https://preview.cruip.com/creative/images/hero-image.png'
        />
      </div>
    </div>
  );
}
