// import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const session = await auth();
  const didLogin = !!session?.user;
  const path = req.nextUrl.pathname;
  // console.log('🚀  middleware.session:', session, didLogin);
  if (!didLogin) {
    const callbackUrl = encodeURIComponent(path);
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url)
    );
  } else {
    // const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    // console.log('🚀 ttttttttttttttt token:', token, process.env.AUTH_SECRET);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|images|api/auth|login|api/regist|samples|ttt|$).*)',
  ],
};
