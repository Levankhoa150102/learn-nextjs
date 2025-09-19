
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'User deleted', user: deletedUser });
  } catch {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
