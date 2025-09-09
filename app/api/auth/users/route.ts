import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'app/api/auth/users.json');

export async function GET() {
  const usersRaw = await fs.readFile(USERS_PATH, 'utf-8');
  const users = JSON.parse(usersRaw);
  return NextResponse.json({ users: users.map((u: { id: number; username: string; role: string }) => ({ id: u.id, username: u.username, role: u.role })) });
}
