import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/utils/roles';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useState } from 'react';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const adminItems: MenuItem[] = [
    getItem('Dashboard', '/admin/dashboard', <PieChartOutlined />),
    getItem('Management', '/admin/manage', <DesktopOutlined />),
    getItem('Statistics', '/admin/statistic', <UserOutlined />),
    getItem('Team', '/admin/team', <TeamOutlined />, [getItem('Team 1', '/admin/team/1'), getItem('Team 2', '/admin/team/2')]),
    getItem('Files', '/admin/files', <FileOutlined />),
];

const userItems: MenuItem[] = [
    getItem('Dashboard', '/user/dashboard', <PieChartOutlined />),
    getItem('Item List', '/user/item-list', <DesktopOutlined />),
    getItem('Wish List', '/user/wish-list', <UserOutlined />),
];

function AppSider() {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    const items = user?.role === ROLES.ADMIN ? adminItems : userItems;

    const handleDirect: MenuProps['onClick'] = (e) => {
        if (e.key && typeof e.key === 'string') {
            router.push(e.key);
        }
    };

    const selectedKeys = items
        .map(item => item?.key as string)
        .filter(key => pathname === key)

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                selectedKeys={selectedKeys}
                mode="inline"
                items={items}
                onClick={handleDirect}
            />
        </Sider>
    );
}

export default memo(AppSider);