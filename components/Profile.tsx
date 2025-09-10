'use client';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

function Profile() {
    const { user } = useAuth();
    return (
        <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Profile</h1>
            {user ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-700">Username:</span>
                        <span className="text-lg text-gray-900">{user.username}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-700">Role:</span>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">
                            {user.role}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500">Please log in to view your profile.</div>
            )}
        </div>
    );
}

export default Profile;