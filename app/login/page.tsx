import { auth, signIn } from '@/lib/auth';
import { query } from '@/lib/db';
import { Button } from '@/components/ui/button';
import GithubLogin from './github-login';
import KakaoLogin from './kakao-login';

type User = {
  id: number;
  nickname: string;
  email: string;
};

export default async function Login() {
  const session = await auth();
  console.log('🚀 login - session:', session);

  const users = await query<User>('select * from User');

  const googleLogin = async (formData: FormData) => {
    'use server';
    const service = formData.get('service') as string;
    await signIn(service);
  };

  const githubLogin = async () => {
    'use server';
    console.log('******');
    await signIn('github');
  };

  return (
    <>
      <h1 className='text-2xl mb-3 text-center'>Login</h1>
      <ul className='text-green-500'>
        {users.map((user) => (
          <li key={user.id}>{user.nickname}</li>
        ))}
      </ul>
      <form action={googleLogin}>
        <input type='hidden' name='service' value='google' />
        <ul className='space-y-3'>
          <li>
            <Button type='submit'>Sign In with Google</Button>
          </li>
          <li>
            <GithubLogin githubLogin={githubLogin} />
          </li>
        </ul>
      </form>

      <KakaoLogin />
    </>
  );
}
