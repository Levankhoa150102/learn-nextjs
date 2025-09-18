'use client'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';


export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-500 to-green-400 shadow">
        <h1 className="text-2xl font-bold text-white">Welcome to the Blog Platform</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white font-medium">{user.name}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='space-x-4'>
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="bg-white text-blue-600 px-4 py-1 rounded font-semibold hover:bg-blue-100 transition"
              >
                Register
              </button>
            </div>

          )}
        </div>
      </header>
      <main className="max-w-2xl mx-auto mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Explore the latest posts and share your thoughts!</h2>

      </main>
    </>
  );
}
