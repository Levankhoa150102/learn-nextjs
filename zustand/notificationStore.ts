import { NotificationService } from '@/services/notificationService';
import { SendNotificationPayload } from '@/types/notificationType';
import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    name: string | null;
    email: string;
  };
  userNotificationId?: string; // For individual operations
}

interface NotificationStore {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  sendNotification: (data: SendNotificationPayload) => Promise<void>;
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const notifications = await NotificationService.getNotifications();
      const notificationsArray = Array.isArray(notifications) ? notifications : [];
      set({ notifications: notificationsArray, loading: false });
    } catch {
      set({ error: 'Failed to fetch notifications', loading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await NotificationService.markAsRead(id);
      set(state => ({
        notifications: Array.isArray(state.notifications) 
          ? state.notifications.map(notif =>
              notif.id === id ? { ...notif, isRead: true } : notif
            )
          : []
      }));
    } catch  {
      set({ error: 'Failed to mark notification as read' });
    }
  },

  markAllAsRead: async () => {
    try {
      await NotificationService.markAllAsRead();
      set(state => ({
        notifications: Array.isArray(state.notifications)
          ? state.notifications.map(notif => ({ ...notif, isRead: true }))
          : []
      }));
    } catch  {
      set({ error: 'Failed to mark all notifications as read' });
    }
  },

  deleteNotification: async (id: string) => {
    try {
      await NotificationService.deleteNotification(id);
      set(state => ({
        notifications: Array.isArray(state.notifications)
          ? state.notifications.filter(notif => notif.id !== id)
          : []
      }));
    } catch  {
      set({ error: 'Failed to delete notification' });
    }
  },

  sendNotification: async (data: { title: string; message: string; type: string; targetRole: string }) => {
    try {
      await NotificationService.createNotification(data);
      await get().fetchNotifications();
    } catch  {
      set({ error: 'Failed to send notification' });
    }
  },

  getUnreadCount: () => {
    const { notifications } = get();
    return Array.isArray(notifications) ? notifications.filter(notif => !notif.isRead).length : 0;
  },
}));