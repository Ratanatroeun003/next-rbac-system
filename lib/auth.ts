import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signinSchema } from '@/features/auth/auth.schema';
import authConfig from '@/auth.config';
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
 debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
    updateAge: 60 * 60,
  },
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const validated = signinSchema.safeParse(credentials);

        if (!validated.success) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: validated.data.email,
          },
          include: {accounts: true},
        });
        if (!user) {
          return null;
        }
        if(!user.password){
           if(user.accounts.length > 0){
          const provider = user.accounts[0].provider
          throw new Error(`This account use ${provider} SignIn. Pleases SignIn with ${provider}`)
          }
          return null
        }
        const isValid = await bcrypt.compare(
          validated.data.password,
          user.password
        );
        if (!isValid) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true;
      }
      if (!user.id || !user.email) {
        return false;
      }
      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
        select: {
          email: true,
          emailVerified: true,
        },
      });
      if (!existingUser) {
        return false;
      }
     if (!existingUser.emailVerified) {
        throw new Error("Please verify your email before signing in.");
      }
      return true;
    },
    async jwt({ token,user }) {
      if (user) {
        token.role = user.role;
      }
      if(!token.role && token.sub) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            role: true,
          },
        });
        if (user) {
          token.role = user.role;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});