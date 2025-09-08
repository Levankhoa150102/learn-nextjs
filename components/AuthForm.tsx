import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password, role);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {mode === 'register' && (
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Register'}
      </button>
    </form>
  );
}
