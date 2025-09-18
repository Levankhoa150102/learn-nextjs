import { prisma } from '@/configurations/prisma';
import { signAccessToken, signRefreshToken } from '@/utils/jwt';
import bcrypt from 'bcryptjs';
// import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }
  const user = await prisma.user.findFirst({ where: { name: username } });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password ?? '');
  if (!valid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const accessToken = signAccessToken({ id: user.id, name: user.name, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, name: user.name, role: user.role });
  const res = NextResponse.json({ user: { id: user.id, name: user.name, role: user.role } });
  res.cookies.set('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  res.cookies.set('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
