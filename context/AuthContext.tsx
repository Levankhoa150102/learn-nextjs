'use client';
import { User } from '@/types/userType';
import api from '@/utils/api';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';



type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: session, status } = useSession();

  useEffect(() => {
    setLoading(status === 'loading');
    if (session?.user) {
      setUser(session.user as User);
    } else {
      setUser(null);
    }
  }, [session, status]);
  

  async function login(username: string, password: string) {
    setLoading(true);
    const res = await api.post('/login', { username, password });
    if (res) {
      setUser(res.data.user);
    } else {
      setUser(null);
      throw new Error('Invalid credentials');
    }
    setLoading(false);
  }

  async function register(username: string, password: string, role: string) {
    setLoading(true);
    const res = await api.post('/register', { username, password, role });
    if (res) {
      setUser(res.data.user);
    } else {
      setUser(null);
      throw new Error('Registration failed');
    }
    setLoading(false);
  }

  async function logout() {
    setLoading(true);
    await api.post('/logout');
    setUser(null);
    setLoading(false);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
