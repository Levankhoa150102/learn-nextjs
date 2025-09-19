
import { prisma } from '@/configurations/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password ?? '');
  if (!valid) {
    return NextResponse.json({ message: 'Password is incorrect' }, { status: 401 });
  }

  // Create a session token and store in DB
  const sessionToken = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires,
    },
  });

  const res = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  res.cookies.set('authjs.session-token', sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires,
  });
  return res;
}
