import { NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';
import { auth } from '@/configurations/auth';

// PATCH - Mark all notifications as read for current user
export async function PATCH() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mark all unread notifications as read for this user
    const updateResult = await prisma.userNotification.updateMany({
      where: { 
        userId: session.user.id,
        isRead: false,
        isDeleted: false
      },
      data: { isRead: true },
    });

    return NextResponse.json({ 
      message: 'All notifications marked as read',
      count: updateResult.count 
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}