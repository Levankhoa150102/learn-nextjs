import React from 'react';
import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-yellow-100">
      <div className="bg-white p-10 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Forbidden</h2>
        <p className="mb-6 text-gray-700">You do not have permission to access this page.</p>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-semibold">Go Home</Link>
      </div>
    </div>
  );
}
