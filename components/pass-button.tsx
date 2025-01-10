'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';

export default function PassButton({
  label,
  action,
  className,
}: {
  label: string;
  action: () => void;
  className: string;
}) {
  const session = useSession();
  return (
    <Button
      variant={'outline'}
      onClick={() => action()}
      className={`${className} w-full`}
    >
      <Image
        width='84'
        height='24'
        src='https://authjs.dev/img/providers/naver.svg'
        alt={label}
      />
      {label} - {session?.data?.user?.name}
    </Button>
  );
}
