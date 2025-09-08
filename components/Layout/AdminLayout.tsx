'use client';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
        <header className="bg-blue-800 text-white p-4 shadow flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="flex items-center gap-4">
            {user && <span className="font-medium">{user.username}</span>}
            <button
              onClick={logout}
              className="bg-white text-blue-800 px-3 py-1 rounded hover:bg-blue-100 font-semibold transition"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="p-8 max-w-5xl mx-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
