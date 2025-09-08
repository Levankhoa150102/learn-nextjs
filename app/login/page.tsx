'use client';
import React from 'react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') router.replace('/admin/dashboard');
      else router.replace('/user/item-list');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <AuthForm mode="login" />
    </div>
  );
}
