'use client';

import { Button } from '@/components/ui/button';

type Props = {
  githubLogin: () => void;
};

export default function GithubLogin({ githubLogin }: Props) {
  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault();
          githubLogin();
        }}
      >
        Sign In with Github
      </Button>
    </>
  );
}
