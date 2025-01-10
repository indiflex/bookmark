'use client';

import { LogOutIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function LogoutButton({
  label,
  signOut,
  className,
}: {
  label: string;
  signOut: () => void;
  className?: string;
}) {
  return (
    <Button
      variant={'outline'}
      onClick={() => signOut()}
      className={`${className}`}
    >
      <LogOutIcon />
      {label}
    </Button>
  );
}
