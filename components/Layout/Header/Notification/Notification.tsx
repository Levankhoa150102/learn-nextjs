'use client';
import { BellFilled, BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import NotificationList from './NotificationList';
import { useWebSocket } from '@/providers/WebSocketProvider';
import { useNotificationStore } from '@/zustand/notificationStore';

export default function Notification() {
    const [open, setOpen] = useState(false);
  const {fetchNotifications, notifications} = useNotificationStore();
  const { socket } = useWebSocket();

  // Initial fetch when component mounts
  useEffect(() => {
      fetchNotifications();
    }, [fetchNotifications]);

  // Listen for real-time notifications (always active)
  useEffect(() => {
    if (!socket) {
      return;
    }


    // Listen for new notifications
    socket.on('new-notification', () => {
      
      // Refresh the notification list to get the latest data
      fetchNotifications().then(() => {
        console.log('✅ fetchNotifications completed in main component');
      }).catch((error) => {
        console.error('❌ fetchNotifications failed in main component:', error);
      });
    });

    // Listen for notification updates
    socket.on('notification-updated', () => {
      fetchNotifications();
    });

    // Listen for notification deletions
    socket.on('notification-deleted', () => {
      fetchNotifications();
    });

    return () => {
      socket.off('new-notification');
      socket.off('notification-updated');
      socket.off('notification-deleted');
    };
  }, [socket, fetchNotifications]);

    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    
    // Calculate unread count based on current notifications state
    const unreadCount = notifications.filter(n => !n.isRead).length;
    return (
        <Dropdown
            popupRender={() => <NotificationList />}
            trigger={['click']}
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
            overlayStyle={{
                position: 'fixed',
                zIndex: 1050
            }}
        >
            <div className="p-2 cursor-pointer">
                <Badge offset={[-2, 2]}
                    count={unreadCount}
                    size='small'
                >
                    {open ? (
                        <BellFilled className='text-2xl' style={{ color: 'white' }} />
                    ) : (
                        <BellOutlined className='text-2xl' style={{ color: 'white' }} />
                    )}
                </Badge>
            </div>
        </Dropdown>
    )
}

