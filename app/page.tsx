'use client'
import ConfirmModal from '@/components/ConfirmModal';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Home() {
  const { user, logout } = useAuth();
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  const router = useRouter();

  return (
    <>
      <header className="flex items-center h-[60px] justify-between px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 shadow">
        <h1 className="text-2xl font-bold text-white">Welcome to the Blog Platform</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">{user.name}</span>
              <button
                onClick={() => setOpenLogoutConfirm(true)}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='space-x-4'>
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Register
              </button>
            </div>

          )}
        </div>
      </header>
      <main className="flex items-center justify-center min-h-[calc(100vh-60px)] bg-gradient-to-br from-blue-50 to-green-100 py-12">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 border border-blue-100">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-2 shadow">
              <svg width="40" height="40" fill="none" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24C4 34.15 10.29 43.29 19 46C19.79 46.09 20 45.5 20 45V40C14.91 40 12 37.09 12 34C12 31.91 14.91 30 20 30H24C29.09 30 32 32.91 32 36C32 39.09 29.09 42 24 42H20V46C20 46.5 20.21 47.09 21 47C29.71 43.29 36 34.15 36 24C36 12.95 27.05 4 24 4Z" fill="currentColor"/></svg>
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
