import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';

import Credentials from "next-auth/providers/credentials"

import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { prisma } from "@/configurations/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;
        const user = await prisma.user.findFirst({ where: { name: credentials.username } });
        if (!user) return null;
        // Add your password check logic here (e.g. bcrypt.compare)
        // For demo, assume plain text
        if (user.password !== credentials.password) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
})
