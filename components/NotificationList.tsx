import React, { useEffect, useState } from 'react';
import { List, Button, Badge, Spin, Alert, Empty, Typography, Space } from 'antd';
import { DeleteOutlined, CheckOutlined, BellOutlined } from '@ant-design/icons';

import ConfirmModal from './ConfirmModal';
import { useNotificationStore, Notification } from '@/zustand/notificationStore';

const { Text } = Typography;

export const NotificationList: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount
  } = useNotificationStore();

  const [deleteModal, setDeleteModal] = useState<{
    visible: boolean;
    notificationId: string | null;
  }>({ visible: false, notificationId: null });

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.notificationId) {
      await deleteNotification(deleteModal.notificationId);
      setDeleteModal({ visible: false, notificationId: null });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#ff4d4f';
      default: return '#1890ff';
    }
  };

  const getTypeIcon = (type: string) => {
    return <BellOutlined style={{ color: getTypeColor(type) }} />;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <Spin size="large" />
        <div className="mt-4">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="mb-6"
      />
    );
  }

  const unreadCount = getUnreadCount();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <Badge count={unreadCount} className="translate-y-[-2px]" />
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleMarkAllAsRead}
            size="small"
          >
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Empty
          description="No notifications yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={notifications}
          renderItem={(notification: Notification) => (
            <List.Item
              key={notification.id}
              className={`border rounded-lg mb-3 p-4 transition-all duration-200 hover:shadow-md ${
                !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}
              actions={[
                !notification.isRead && (
                  <Button
                    key="mark-read"
                    type="link"
                    icon={<CheckOutlined />}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="text-green-600"
                  >
                    Mark as Read
                  </Button>
                ),
                <Button
                  key="delete"
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setDeleteModal({ visible: true, notificationId: notification.id })}
                >
                  Delete
                </Button>
              ].filter(Boolean)}
            >
              <List.Item.Meta
                avatar={getTypeIcon(notification.type)}
                title={
                  <div className="flex items-center gap-2">
                    <span className={!notification.isRead ? 'font-semibold' : 'font-normal'}>
                      {notification.title}
                    </span>
                    {!notification.isRead && (
                      <Badge status="processing" />
                    )}
                  </div>
                }
                description={
                  <Space direction="vertical" size="small" className="w-full">
                    <Text className="text-gray-600">{notification.message}</Text>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>From: {notification.sender.name || notification.sender.email}</span>
                      <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}

      <ConfirmModal
        visible={deleteModal.visible}
        title="Delete Notification"
        content="Are you sure you want to delete this notification? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ visible: false, notificationId: null })}
      />
    </div>
  );
};