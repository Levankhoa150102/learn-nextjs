import { NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';
import { auth } from '@/configurations/auth';

// PATCH - Mark all notifications as read for current user's role
export async function PATCH() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.notification.updateMany({
      where: { 
        targetRole: user.role,
        isRead: false 
      },
      data: { isRead: true },
    });

    return NextResponse.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}