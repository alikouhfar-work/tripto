import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import NextAuth from 'next-auth';
import { encode } from 'next-auth/jwt';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { headers } from 'next/headers';
import { loginSchema } from './features/authentication/schema';
import { prisma } from '@repo/database';

const adapter = PrismaAdapter(prisma);

/** Roles allowed into the admin dashboard. Everyone else (incl. Guests) is bounced. */
export const STAFF_ROLES = ['Admin', 'Manager'] as const;

const isStaffRole = (role: unknown): boolean =>
  typeof role === 'string' && (STAFF_ROLES as readonly string[]).includes(role);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,

  session: {
    strategy: 'database',
    // Explicit lifetimes (previously only the credentials path set an expiry).
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = loginSchema.parse(credentials);

        const user = await prisma.user.findFirst({
          where: {
            username: validatedCredentials.username,
          },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(validatedCredentials.password, user.password);

        if (!isValid) return null;

        // Staff-only login: Guests (and unknown roles) cannot use the admin,
        // even with valid credentials.
        if (!isStaffRole(user.role)) return null;

        // Minimal user object — never pass the password hash into the pipeline.
        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async signIn({ user, account }) {
      // OAuth (Google) may only sign in pre-existing staff accounts.
      // Returning false stops the flow before the adapter creates a User row,
      // so random Google identities can neither enter nor pollute the DB.
      if (account?.provider === 'credentials') return true;
      if (!user.email) return false;
      const existing = await prisma.user.findFirst({ where: { email: user.email } });
      return !!existing && isStaffRole(existing.role);
    },

    async authorized({ auth, request }) {
      const isStaff = !!auth?.user && isStaffRole(auth.user.role);
      const pathname = request.nextUrl.pathname;
      const isAuthPage = pathname.startsWith('/login');

      if (isAuthPage) {
        if (isStaff) return Response.redirect(new URL('/', request.nextUrl));
        return true;
      }
      return isStaff;
    },

    async jwt({ token, account }) {
      if (account?.provider === 'credentials') {
        token.credentials = true;
      }

      return token;
    },

    async session({ session }) {
      const headersList = await headers();
      session.user.city = headersList.get('x-vercel-ip-city') ?? 'Hillsboro';
      session.user.region = headersList.get('x-vercel-ip-country-region') ?? 'Oregon';
      session.user.locale = headersList.get('accept-language')?.split(',')[0] ?? 'en-US';
      session.user.country = headersList.get('x-vercel-ip-country') ?? 'United States of America';

      return session;
    },
  },

  jwt: {
    async encode(params) {
      if (params.token?.credentials) {
        if (!params.token.sub) return '';

        const sessionToken = crypto.randomBytes(32).toString('hex');

        await adapter.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return sessionToken;
      }

      return encode(params);
    },
  },
});
