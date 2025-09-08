import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/utils/jwt';
import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'app/api/auth/users.json');

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.json({ message: 'No access token' }, { status: 401 });
  }
  try {
    const payload = verifyAccessToken(accessToken) as any;
    const usersRaw = await fs.readFile(USERS_PATH, 'utf-8');
    const users = JSON.parse(usersRaw);
    const user = users.find((u: { id: string }) => u.id === payload.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ user: { id: user.id, username: user.username, role: user.role } });
  } catch (e) {
    return NextResponse.json({ message: 'Invalid access token' }, { status: 401 });
  }
}
