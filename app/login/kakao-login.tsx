'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { type SNS } from './page';

type Props = {
  login: (service: SNS) => void;
};
export default function KakaoLogin({ login }: Props) {
  return (
    <Button
      variant={'outline'}
      onClick={() => login('kakao')}
      className='w-full mb-3 fjb'
    >
      <Image
        loading='lazy'
        width='24'
        height='24'
        src='https://authjs.dev/img/providers/kakao.svg'
        alt='login with github'
      />
      Sign In with Kakao
    </Button>
  );
}
