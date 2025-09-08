import React from 'react';
import UserLayout from '@/components/Layout/UserLayout';

export default function UserItemListPage() {
  return (
    <UserLayout>
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <div className="bg-white rounded shadow p-6">Your items will be listed here.</div>
    </UserLayout>
  );
}
