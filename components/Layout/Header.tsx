'use client';

import { useAuth } from '@/context/AuthContext';
import { ROLES } from '@/utils/roles';
import { useRouter } from 'next/navigation';

function AppHeader() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
      await logout();
      router.replace('/login');
    }

  return (
    <div className="w-full bg-gradient-to-br from-white to-blue-100">
      <header className="bg-blue-700 text-white p-4 shadow flex items-center justify-between">
        <h1 className="text-xl font-bold">{user?.role === ROLES.ADMIN ? 'Admin Workspace' : 'User Workspace'}</h1>
        <div className="flex items-center gap-4">
          {user && <span className="font-medium">{user?.name}</span>}
          <button
            onClick={handleLogout}
            className="bg-white text-blue-700 px-3 py-1 rounded hover:bg-blue-100 font-semibold transition"
          >
            Logout
          </button>
        </div>
      </header>
    </div>
  );
}

export default AppHeader;