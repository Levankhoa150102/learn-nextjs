import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Form, Input } from 'antd';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  async function handleSubmit() {
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (err) {
      setError((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onFinish={handleSubmit}
      className="max-w-md w-[400px] mx-auto mt-16 bg-white !p-8 rounded shadow-lg space-y-6"
      layout="vertical"
    >
      <h2 className="text-2xl font-bold text-center mb-4">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded text-center">{error}</div>}
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' },
        { type: 'email', message: 'Please enter a valid email address' }
        ]}
      >
        <Input
          className="w-full min-h-[40px] border px-3 py-2 rounded focus:outline-none focus:ring"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters long' },
          ...(mode === 'register'
            ? [{ pattern: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain at least one special character' }]
            : [])
        ]}
      >
        <Input.Password
          className="w-full min-h-[40px] border px-3 py-2 rounded focus:outline-none focus:ring"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <button
          type="submit"
          className={`w-full bg-blue-600  text-white py-2 rounded font-semibold hover:bg-blue-700 transition ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
          disabled={loading}
        >
          {loading ? <span className="flex items-center justify-center opacity-70">
            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </span>
            : mode === 'login' ? 'Sign In' : 'Register'}
        </button>
      </Form.Item>
      {mode === 'login' ? (
        <>
          <p className="text-center text-sm">
            Don&#39;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <div className="mt-6 flex flex-col gap-3 items-center">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded shadow transition"
              onClick={() => signIn('google')}
            >
              {/* Google SVG */}
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_17_40)">
                  <path d="M47.5 24.5C47.5 23.1 47.4 21.7 47.2 20.3H24.5V28.2H37.3C36.7 31.2 34.7 33.7 31.8 35.2V40.1H39.2C43.2 36.5 45.5 31.1 45.5 24.5Z" fill="#4285F4" />
                  <path d="M24.5 47C30.1 47 34.8 45.2 39.2 40.1L31.8 35.2C29.7 36.5 27.2 37.3 24.5 37.3C19.1 37.3 14.5 33.7 12.8 28.7H5.1V33.8C9.5 41.1 16.5 47 24.5 47Z" fill="#34A853" />
                  <path d="M12.8 28.7C12.3 27.4 12 26 12 24.5C12 23 12.3 21.6 12.8 20.3V15.2H5.1C3.7 17.9 3 21.1 3 24.5C3 27.9 3.7 31.1 5.1 33.8L12.8 28.7Z" fill="#FBBC05" />
                  <path d="M24.5 11.7C27.5 11.7 30.1 12.7 32.1 14.6L39.3 7.4C34.8 3.2 30.1 1 24.5 1C16.5 1 9.5 6.9 5.1 15.2L12.8 20.3C14.5 15.3 19.1 11.7 24.5 11.7Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="font-medium">Sign in with Google</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded shadow transition"
              onClick={() => signIn('github', { redirectTo: '/user/dashboard' })}
            >
              {/* GitHub SVG */}
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4C12.95 4 4 12.95 4 24C4 34.15 10.29 43.29 19 46C19.79 46.09 20 45.5 20 45V40C14.91 40 12 37.09 12 34C12 31.91 14.91 30 20 30H24C29.09 30 32 32.91 32 36C32 39.09 29.09 42 24 42H20V46C20 46.5 20.21 47.09 21 47C29.71 43.29 36 34.15 36 24C36 12.95 27.05 4 24 4Z" fill="currentColor" />
              </svg>
              <span className="font-medium">Sign in with GitHub</span>
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      )}
    </Form>
  );
}
