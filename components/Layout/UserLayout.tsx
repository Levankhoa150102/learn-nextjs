'use client';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppHeader from './Header';
import { ROLES } from '@/utils/roles';
import AppSider from './Sider';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={[ROLES.USER]}>
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
