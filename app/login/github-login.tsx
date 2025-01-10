'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SNS } from './page';

type Props = {
  githubLogin: (service: SNS) => void;
};

export default function GithubLogin({ githubLogin }: Props) {
  return (
    <>
      <Button
        variant={'outline'}
        onClick={(e) => {
          e.preventDefault();
          githubLogin('github');
        }}
        className='w-full flex justify-between'
      >
        <Image
          loading='lazy'
          width='24'
          height='24'
          src='https://authjs.dev/img/providers/github.svg'
          alt='login with github'
        />
        Sign In with Github
      </Button>
    </>
  );
}
