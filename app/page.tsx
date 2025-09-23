'use client'
import ConfirmModal from '@/components/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import { CaretDownOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Home() {
  const { user, logout } = useAuth();
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => {
        if (user) {
          router.push(`/${user.role}/profile/`);
        }
      },
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => setOpenLogoutConfirm(true),
    },
  ];
  return (
    <>
      <header className="flex items-center h-[60px] justify-between px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 shadow">
        <h1 className="text-2xl font-bold text-white">Welcome to the Blog Platform</h1>
        <div>
          {user ? <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            onOpenChange={(open) => setDropdownOpen(open)}
          >
            <div className="flex items-center cursor-pointer select-none gap-3 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 hover:backdrop-blur-sm transition-all duration-300 ">
              <Avatar
                size={40}
                icon={<UserOutlined />}
                src={user?.image}
                alt={user?.name}
                className="ring-2 ring-white ring-opacity-30"
              />
              <div className="flex flex-col text-left">
                <span className="font-semibold text-white">{user?.name}</span>
                <span className="text-xs text-blue-100">{user?.role}</span>
              </div>
              <CaretDownOutlined className={`${dropDownOpen ? 'rotate-180 ' : ''} transition-all ease-in-out duration-300 text-white`} />
            </div>
          </Dropdown> :
            <div className="flex gap-4">
              <button
                className="bg-white bg-opacity-80 text-blue-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-opacity-100 transition"
                onClick={() => router.push('/login')}
              >
                Login
              </button>
              <button
                className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                onClick={() => router.push('/register')}
              >
                Register
              </button>
            </div>
          }


        </div>
      </header>
      <main className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-gradient-to-br from-blue-50 to-green-100 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 border border-blue-100">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-2 shadow">
              <svg width="40" height="40" fill="none" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24C4 34.15 10.29 43.29 19 46C19.79 46.09 20 45.5 20 45V40C14.91 40 12 37.09 12 34C12 31.91 14.91 30 20 30H24C29.09 30 32 32.91 32 36C32 39.09 29.09 42 24 42H20V46C20 46.5 20.21 47.09 21 47C29.71 43.29 36 34.15 36 24C36 12.95 27.05 4 24 4Z" fill="currentColor" /></svg>
            </span>
            <h2 className="text-3xl font-extrabold text-blue-700 mb-1">Welcome to the Blog Platform</h2>
            <p className="text-gray-600 text-base max-w-lg mb-2">
              Read insightful articles, join discussions, and connect with a vibrant community. Whether you&#39;re an admin or a user, there&#39;s something for everyone.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:scale-105 transition text-lg mt-2"
            onClick={() => {
              if (user?.role === 'admin') {
                router.push('/admin/dashboard');
              } else {
                router.push('/user/dashboard');
              }
            }}
          >
            Get Started
          </button>
        </div>
      </main>
      {openLogoutConfirm && <ConfirmModal
        visible={openLogoutConfirm}
        title="Confirm Logout"
        content="Are you sure you want to logout?"
        onConfirm={() => {
          logout();
          setOpenLogoutConfirm(false);
        }}
        onCancel={() => setOpenLogoutConfirm(false)}
      />}
    </>
  );
}
