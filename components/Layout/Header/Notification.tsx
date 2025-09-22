import { BellFilled, BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd';
import { useState } from 'react';
import NotificationList from './NotificationList';
// import { useNotificationStore } from '@/zustand/NotificationStore';

// const mockNotifications: Notification[] = [
//     {
//         id: '1',
//         title: 'New Message',
//         message: 'You have received a new message from John Doe',
//         type: NotificationType.INFO,
//         isRead: true,
//         createAt: '2 minutes ago',
//         role: ROLES.USER,
//     },
//     {
//         id: '2',
//         title: 'System Update',
//         message: 'Your profile has been successfully updated',
//         type: NotificationType.SUCCESS,
//         isRead: false,
//         createAt: '1 hour ago',
//         role: ROLES.ADMIN,
//     },
//     {
//         id: '3',
//         title: 'Security Alert',
//         message: 'New login detected from unknown device',
//         type: NotificationType.WARNING,
//         isRead: false,
//         createAt: '3 hours ago',
//         role: ROLES.USER,
//     },
//     {
//         id: '4',
//         title: 'Welcome!',
//         message: 'Welcome to our platform! Complete your profile to get started',
//         type: NotificationType.INFO,
//         isRead: true,
//         createAt: '1 day ago',
//         role: ROLES.USER,
//     },
// ];
export default function Notification() {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (flag: boolean) => {
        setOpen(flag);
    };

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
                    count={10}
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

