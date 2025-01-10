import { BookmarkIcon } from 'lucide-react';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import Link from 'next/link';
// import localFont from 'next/font/local';
import { auth, signOut } from '@/lib/auth';
import LogoutButton from '@/components/logout-button';
import './globals.css';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'BookMark',
  description: 'Book & Mark',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const didLogin = !!session?.user?.email;
  console.log('🚀 layout - session:', session);

  return (
    <html lang='en'>
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className='antialiased h-screen flex flex-col'
      >
        <header className='flex items-center justify-between shadow-md h-12 fixed top-0 w-full px-3 bg-white '>
          <Link
            href='/'
            className='flex items-center text-2xl text-green-700 font-bold tracking-tighter'
          >
            <BookmarkIcon className='bg-slate-200 rounded-md' /> BookMark
          </Link>

          <div className='space-x-5'>
            <Link href='/samples'>Samples</Link>

            {didLogin ? (
              <LogoutButton
                label={`${session?.user?.name}`}
                signOut={async () => {
                  'use server';
                  await signOut();
                }}
              />
            ) : (
              <Link href='/api/auth/signin?callbackUrl=/'>SignIn</Link>
            )}
          </div>
        </header>

        <div className='flex-1 overflow-hidden'>
          <main className='flex flex-col h-full pt-12 pb-7'>
            <SessionProvider session={session}>{children}</SessionProvider>
          </main>
        </div>
        <footer className='fixed bottom-0 text-center w-full'>
          &#169; indiflex SeniorCoding
        </footer>
      </body>
    </html>
  );
}
