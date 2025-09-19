

import { NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';
import { cookies } from 'next/headers';


export async function POST() {
  // Get session token from cookies
  // Try both possible cookie names
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('authjs.session-token')?.value

  if (sessionToken) {
    await prisma.session.deleteMany({ where: { sessionToken } });
  }

  const res = NextResponse.json({ message: 'Logged out' });
  // Clear NextAuth session cookie (for OAuth)
  res.cookies.set('authjs.session-token', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;
}
