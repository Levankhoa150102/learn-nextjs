import { useNotificationStore } from '@/zustand/notificationStore';
import { CheckOutlined, MessageOutlined, WarningOutlined } from '@ant-design/icons';
import { Avatar, Empty, List, Typography } from 'antd';

const { Text, Title } = Typography;


export default function NotificationList() {
  const { notifications, markAsRead } = useNotificationStore();


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
    <div className="min-w-[300px] max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Title level={5} className="!mb-0 text-gray-800">
            Notifications
          </Title>
        </div>
        {/* <Button
          type="link"
          size="small"
          onClick={() => markAsRead}
          className="text-blue-600 hover:text-blue-800 p-0 h-auto"
        >
          Mark all as read
        </Button> */}
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto">
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
                className={`px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 ${!item.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                onClick={() => markAsRead(item.id)}
              >
                <List.Item.Meta
                  className='p-2'
                  avatar={
                    <Avatar
                      size={40}
                      icon={getIcon(item.type)}
                      className="flex-shrink-0"
                    />
                  }
                  title={
                    <div className="flex items-center justify-between">
                      <Text strong={!item.isRead} className="text-gray-800 text-sm font-bold">
                        {item.title}
                      </Text>
                      {!item.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                  }
                  description={
                    <div className="space-y-1">
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {item.message}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    </div>
  );
}
