import { SendNotificationPayload } from "@/types/notificationType";

export class NotificationService {
  // Create a new notification
  static async createNotification(data: SendNotificationPayload) {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create notification');
    }
    
    return await response.json();
  }

  // Get notifications for the current user's role
  static async getNotifications() {
    const response = await fetch('/api/notifications');
    
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    
    const data = await response.json();
    return data.notifications || [];
  }

  // Mark notification as read
  static async markAsRead(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead: true }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
    
    return await response.json();
  }

  // Mark all notifications as read
  static async markAllAsRead() {
    const response = await fetch('/api/notifications/mark-all-read', {
      method: 'PATCH',
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
    
    return await response.json();
  }

  // Delete notification
  static async deleteNotification(id: string) {
    const response = await fetch(`/api/notifications/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }
    
    return await response.json();
  }
}