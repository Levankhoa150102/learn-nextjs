import { useWebSocket } from '@/providers/WebSocketProvider';
import fromNowTime from '@/utils/fromNowTime';
import { Notification, useNotificationStore } from '@/zustand/notificationStore';
import { CheckOutlined, CloseOutlined, EyeOutlined, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, List, Space, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import NotificationViewModal from './NotificationViewModal';

const { Text, Title } = Typography;


export default function NotificationList() {
  const { notifications, markAsRead, deleteNotification, markAllAsRead, fetchNotifications } = useNotificationStore();
  const { socket } = useWebSocket();
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Listen for real-time notifications
  useEffect(() => {
    if (!socket) return;

    // Listen for new notifications
    socket.on('new-notification', (notification) => {
      console.log('📢 New notification received:', notification);
    
      // Refresh the notification list to get the latest data
      fetchNotifications();
    });

    // Listen for notification updates (like mark as read)
    socket.on('notification-updated', () => {
      console.log('📝 Notification updated, refreshing list...');
      fetchNotifications();
    });

    // Listen for notification deletions
    socket.on('notification-deleted', () => {
      console.log('🗑️ Notification deleted, refreshing list...');
      fetchNotifications();
    });

    return () => {
      socket.off('new-notification');
      socket.off('notification-updated');
      socket.off('notification-deleted');
    };
  }, [socket, fetchNotifications]);

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNotification(null);
  };



  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <WarningOutlined className="text-orange-500" />;
      case 'success':
        return <CheckOutlined className="text-green-500" />;
      case 'error':
        return <WarningOutlined className="text-red-500" />;
      default:
        return <MessageOutlined className="text-blue-500" />;
    }
  };

  return (
    <div
      className="min-w-[300px] max-w-md bg-white rounded-lg shadow-lg border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Title level={5} className="!mb-0 text-gray-800">
            Notifications
          </Title>
        </div>
        <Button
          type="link"
          size="small"
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-800 p-0 h-auto"
        >
          Mark all as read
        </Button>
      </div>

      {/* Notification List */}
      <div className="min-h-96  max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6">
            <Empty
              description="No notifications"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="text-gray-500"
            />
          </div>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            split={false}
            renderItem={(item) => (
              <List.Item
                className={`px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${!item.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
                actions={[
                  <Space key="actions">
                    <Tooltip title="View details">
                      <Button
                        type="text"
                        icon={<EyeOutlined />}
                        size="small"
                        className="hover:text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewNotification(item);
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete notification">
                      <Button
                        type="text"
                        icon={<CloseOutlined />}
                        size="small"
                        className="hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(item.id);
                        }}
                      />
                    </Tooltip>
                  </Space>
                ]}
                onClick={() => handleViewNotification(item)}
              >
                <List.Item.Meta
                  className='p-2'
                  avatar={
                    <div className="relative">
                      <Avatar
                        size={40}
                        icon={getIcon(item.type)}
                        className="flex-shrink-0 "
                      />

                    </div>
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <Text strong={item.isRead} className="text-gray-800 text-sm font-bold line-clamp-2">
                        {item.title}
                      </Text>
                    </div>
                  }
                  description={
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.message}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {fromNowTime(new Date(item.createdAt))}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>

      <NotificationViewModal
        notification={selectedNotification}
        open={modalOpen}
        onClose={handleCloseModal}
        onDelete={deleteNotification}
      />
    </div>
  );
}
