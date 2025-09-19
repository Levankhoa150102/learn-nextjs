
import { prisma } from '@/configurations/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const existing = await prisma.user.findFirst({ where: { email: email } });
  if (existing) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: email.split('@')[0], email: email, role: 'user', password: hashed },
  });

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

  const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  res.cookies.set('authjs.session-token', sessionToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    expires,
  });
  return res;
}