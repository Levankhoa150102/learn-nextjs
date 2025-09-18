'use client';
import { useAuth } from '@/context/AuthContext';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';



interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useAuth();


  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (!allowedRoles.includes(user.role)) {
        router.replace('/403');
      }
    }
  }, [loading, allowedRoles, router, user]);

  if (loading || !user || !allowedRoles.includes(user.role)) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spin className="text-blue-700" size="large" />
      </div>
    );
  }

  return <>{children}</>;
}
