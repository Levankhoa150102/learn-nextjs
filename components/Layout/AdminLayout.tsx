'use client';
import ProtectedRoute from '@/components/ProtectedRoute';
import React from 'react';
import AppHeader from './Header';
import AppSider from './Sider';
import { ROLES } from '@/utils/roles';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="flex">
        <AppSider />
        <div className="flex flex-col min-h-screen w-full" >
          <AppHeader />
          <main className="flex-1 p-4 bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
