import { ROLES } from "@/utils/roles";

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
  role: ROLES;
  avatar?: string;
}

export type SendNotificationPayload =
  {
    title: string;
    message: string;
    type: string;
    targetRole?: string | null;
    targetUserId?: string
  };

export type UserNotification = {
  id: string;
  userId: string;
  notificationId: string;
  isRead: boolean;
  isDeleted: boolean;
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    targetRole: string;
    createdAt: Date;
    updatedAt: Date;
    sender: {
      id: string;
      name: string;
      email: string;
    };
  };
}