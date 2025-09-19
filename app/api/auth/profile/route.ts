
import { prisma } from '@/configurations/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await prisma.user.findFirst();
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ user: {...user} });
}
