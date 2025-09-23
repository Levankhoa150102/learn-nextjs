import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';
import { auth } from '@/configurations/auth';
import { User } from '@/types/userType';
import { UserNotification } from '@/types/notificationType';

// GET - Fetch notifications for the current user
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get notifications for this user from UserNotification junction table
    const userNotifications = await prisma.userNotification.findMany({
      where: {
        userId: session.user.id,
        isDeleted: false // Only get non-deleted notifications
      },
      include: {
        notification: {
          include: {
            sender: {
              select: { id: true, name: true, email: true }
            }
          }
        }
      },
      orderBy: {
        notification: {
          createdAt: 'desc'
        }
      }
    });

    // Transform the data to match frontend expectations
    const notifications = userNotifications.map((un: UserNotification) => ({
      id: un.notification.id,
      title: un.notification.title,
      message: un.notification.message,
      type: un.notification.type,
      targetRole: un.notification.targetRole,
      isRead: un.isRead, // From UserNotification table
      createdAt: un.notification.createdAt,
      updatedAt: un.notification.updatedAt,
      sender: un.notification.sender,
      userNotificationId: un.id // For individual operations
    }));

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Send a notification
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, message, type, targetRole } = await request.json();

    if (!title || !message || !type || !targetRole) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Step 1: Create the notification
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        targetRole,
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    // Step 2: Get target users based on role
    let targetUsers;
    if (targetRole === 'all') {
      targetUsers = await prisma.user.findMany({
        select: { id: true }
      });
    } else {
      targetUsers = await prisma.user.findMany({
        where: { role: targetRole },
        select: { id: true }
      });
    }

    // Step 3: Create UserNotification records for each target user
    if (targetUsers.length > 0) {
      await prisma.userNotification.createMany({
        data: targetUsers.map((user: User) => ({
          userId: user.id,
          notificationId: notification.id,
          isRead: false,
          isDeleted: false
        }))
      });
    }

    return NextResponse.json({ 
      notification,
      recipientCount: targetUsers.length
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}