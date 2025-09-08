'use client';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  return (
    <ProtectedRoute allowedRoles={['user']}>
      <div className="min-h-screen bg-gradient-to-br from-white to-green-100">
        <header className="bg-green-700 text-white p-4 shadow flex items-center justify-between">
          <h1 className="text-xl font-bold">User Area</h1>
          <div className="flex items-center gap-4">
            {user && <span className="font-medium">{user.username}</span>}
            <button
              onClick={logout}
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-green-100 font-semibold transition"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-8 max-w-3xl mx-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
