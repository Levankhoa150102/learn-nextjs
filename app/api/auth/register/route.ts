import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '@/utils/jwt';
import { ROLES } from '@/utils/roles';

const USERS_PATH = path.join(process.cwd(), 'app/api/auth/users.json');

export async function POST(req: NextRequest) {
  const { username, password, role } = await req.json();
  if (!username || !password || !role) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }
  if (![ROLES.ADMIN, ROLES.USER].includes(role)) {
    return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
  }
  const usersRaw = await fs.readFile(USERS_PATH, 'utf-8');
  const users = JSON.parse(usersRaw);
  if (users.find((u: { username: string }) => u.username === username)) {
    return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  // Issue tokens
  const accessToken = signAccessToken({ id: newUser.id, username, role });
  const refreshToken = signRefreshToken({ id: newUser.id, username, role });
  const res = NextResponse.json({ user: { id: newUser.id, username, role } });
  res.cookies.set('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  res.cookies.set('refreshToken', refreshToken, { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}
