import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/configurations/prisma';
import { auth } from '@/configurations/auth';
import { User } from '@/types/userType';
import { UserNotification } from '@/types/notificationType';
import { Server as SocketIOServer } from 'socket.io';

// Helper function to get Socket.IO instance
function getSocketServer(): SocketIOServer | null {
  if (typeof window !== 'undefined') return null; // Client-side
  
  try {
    // Access the global socket server instance
    const globalForSocket = globalThis as unknown as { 
      socketServer?: SocketIOServer 
    };
    return globalForSocket.socketServer || null;
  } catch {
    return null;
  }
}

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

    const { title, message, type, targetRole, targetUserId } = await request.json();


    if (!title || !message || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate targeting: either targetRole or targetUserId must be provided
    if (!targetRole && !targetUserId) {
      return NextResponse.json({ error: 'Either targetRole or targetUserId must be provided' }, { status: 400 });
    }

    if (targetRole && targetUserId) {
      return NextResponse.json({ error: 'Cannot specify both targetRole and targetUserId' }, { status: 400 });
    }

    // Step 1: Create the notification
    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        targetRole: targetRole || 'specific-user', // Use 'specific-user' when targeting individual users
        senderId: session.user.id,
      },
      include: {
        sender: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    // Step 2: Get target users based on role or specific user
    let targetUsers;
    
    if (targetUserId) {
      // Target specific user
      const targetUser = await prisma.user.findUnique({
        where: { id: targetUserId },
        select: { id: true }
      });
      
      if (!targetUser) {
        return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
      }
      
      targetUsers = [targetUser];
    } else if (targetRole === 'all') {
      // Target all users
      targetUsers = await prisma.user.findMany({
        select: { id: true }
      });
    } else {
      // Target users by role
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

      // Step 4: Emit real-time notifications via Socket.IO
      const io = getSocketServer();
      if (io) {
        // Send to specific users
        targetUsers.forEach((user: User) => {
          const room = `user-${user.id}`;
          io.to(room).emit('new-notification', {
            id: notification.id,
            title: notification.title,
            message: notification.message,
            type: notification.type,
            isRead: false,
            createdAt: notification.createdAt,
            sender: notification.sender
          });
        });

        // Also send to role-based rooms (only if targeting by role)
        if (targetRole) {
          if (targetRole === 'all') {
            io.emit('new-notification', notification);
          } else {
            const roleRoom = `role-${targetRole}`;
            io.to(roleRoom).emit('new-notification', notification);
          }
        }
      } else {
        console.log('Socket.IO server not available');
      }
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