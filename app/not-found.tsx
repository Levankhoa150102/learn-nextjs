'use client';
import { useRouter } from 'next/navigation';

function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="min-h-[100vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-100">
            <div className="bg-white rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center gap-6 border border-blue-100">
                <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-2 shadow">
                    <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24C4 34.15 10.29 43.29 19 46C19.79 46.09 20 45.5 20 45V40C14.91 40 12 37.09 12 34C12 31.91 14.91 30 20 30H24C29.09 30 32 32.91 32 36C32 39.09 29.09 42 24 42H20V46C20 46.5 20.21 47.09 21 47C29.71 43.29 36 34.15 36 24C36 12.95 27.05 4 24 4Z" fill="currentColor"/></svg>
                </span>
                <h1 className="text-4xl font-extrabold text-blue-700 mb-2">404 - Page Not Found</h1>
                
                <button
                    className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition text-lg"
                    onClick={() => router.push('/')}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

export default NotFoundPage;
