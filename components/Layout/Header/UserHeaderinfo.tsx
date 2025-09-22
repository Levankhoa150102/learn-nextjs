import { User } from '@/types/userType';
import { CaretDownOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction, useState } from 'react';

type UserHeaderinfoProps = {
    user: User | null;
    setOpenLogoutConfirmAction: Dispatch<SetStateAction<boolean>>;
    router: AppRouterInstance;
}
export default function UserHeaderinfo({ user,  setOpenLogoutConfirmAction, router }: UserHeaderinfoProps) {
    const [dropDownOpen, setDropdownOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            icon: <ProfileOutlined />,
            label: 'Profile',
            onClick: () => router.push(`/profile`),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => setOpenLogoutConfirmAction(true),
        },
    ];
    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            onOpenChange={(open) => setDropdownOpen(open)}
        >
            <div className="flex items-center cursor-pointer select-none gap-3 px-2 py-1 rounded hover:bg-blue-600 transition">
                <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    src={user?.image}
                    alt={user?.name}
                />
                <div className="flex flex-col text-left">
                    <span className="font-semibold">{user?.name}</span>
                    <span className="text-xs text-blue-200">{user?.role}</span>
                </div>
                <CaretDownOutlined className={`${dropDownOpen ? 'rotate-180 ' : ''} transition-all ease-in-out duration-300`} />
            </div>
        </Dropdown>
    )
}
