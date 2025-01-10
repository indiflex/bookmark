import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github, Naver, Kakao],

  callbacks: {
    async signIn({ account, profile }) {
      console.log('🚀  account:', account);
      console.log('🚀  profile:', profile);

      return true;
    },

    // async jwt({ token, user }) {},

    async session({ session, user }) {
      console.log('🚀 auth.session.session:', session);
      console.log('🚀 auth.session.user:', user);
      // session.user = user;
      return session;
    },
  },
  trustHost: true,
  pages: {
    signIn: `/login`,
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 5, // 5 min
  },
});
