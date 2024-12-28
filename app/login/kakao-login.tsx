'use client';

import { login } from '@/actions/sign';
import { Button } from '@/components/ui/button';

export default function KakaoLogin() {
  return (
    <Button variant={'outline'} onClick={() => login('kakao')}>
      Sign In with Kakao
    </Button>
  );
}
