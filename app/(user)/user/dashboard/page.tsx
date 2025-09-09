import React from 'react';
import UserLayout from '@/components/Layout/UserLayout';

export default function UserDashboardPage() {
    return (
        <UserLayout>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="bg-white rounded shadow p-6">Welcome, User! Here is your dashboard overview.</div>
        </UserLayout>
    );
}