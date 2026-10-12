
import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
export default {
  pages: {
    signIn: '/sign-in',
    error: '/auth-error',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
} satisfies NextAuthConfig;