import React from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';

export default function AdminDashboardPage() {
    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="bg-white rounded shadow p-6">Welcome, Admin! Here is your dashboard overview.</div>
        </AdminLayout>
    );
}