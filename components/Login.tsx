'use client';

import { LogIn } from 'lucide-react';
import { FormEvent, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
  signin: (service: string) => void;
};

export default function Login({ signin }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin('google');
  };

  return (
    <>
      <form onSubmit={login} className='flex flex-col space-y-3'>
        <Label htmlFor='email'>
          Email
          <Input id='email' ref={emailRef} />
        </Label>

        <Label htmlFor='passwd' className='mt-3'>
          Password
          <Input id='passwd' type='password' ref={passwdRef} />
        </Label>

        <Button className='flex justify-between'>
          Sign In
          <LogIn />
        </Button>
      </form>

      <div>
        <Button className='flex justify-between'>Google</Button>
      </div>
    </>
  );
}
