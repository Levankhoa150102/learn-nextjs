'use client';
import { BellFilled, BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import NotificationList from './NotificationList';
import { useNotificationStore } from '@/zustand/notificationStore';

export default function Notification() {
    const [open, setOpen] = useState(false);
  const {getUnreadCount, fetchNotifications} = useNotificationStore();

  useEffect(() => {
      fetchNotifications();
    }, [fetchNotifications]);

    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };
    const unreadCount = getUnreadCount();
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

