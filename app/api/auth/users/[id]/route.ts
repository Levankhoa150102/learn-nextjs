import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const USERS_PATH = path.join(process.cwd(), 'app/api/auth/users.json');

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numId = Number(id);
  const usersRaw = await fs.readFile(USERS_PATH, 'utf-8');
  const users = JSON.parse(usersRaw);
  const userIndex = users.findIndex((u: { id: number }) => u.id === numId);
  if (userIndex === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  users.splice(userIndex, 1);
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  return NextResponse.json({ message: 'User deleted' });
}
