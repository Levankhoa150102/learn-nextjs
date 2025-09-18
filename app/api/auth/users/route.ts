
import { NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ users });
}
