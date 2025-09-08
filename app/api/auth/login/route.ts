import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '@/utils/jwt';

const USERS_PATH = path.join(process.cwd(), 'app/api/auth/users.json');

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }
  const usersRaw = await fs.readFile(USERS_PATH, 'utf-8');
  const users = JSON.parse(usersRaw);
  const user = users.find((u: { username: string }) => u.username === username);
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
  const accessToken = signAccessToken({ id: user.id, username: user.username, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, username: user.username, role: user.role });
  const res = NextResponse.json({ user: { id: user.id, username: user.username, role: user.role } });
  res.cookies.set('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  res.cookies.set('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
