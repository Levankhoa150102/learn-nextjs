import React from 'react';
import UserLayout from '@/components/Layout/UserLayout';

export default function UserWishListPage() {
  return (
    <UserLayout>
      <h2 className="text-2xl font-bold mb-4">Wish List</h2>
      <div className="bg-white rounded shadow p-6">Your wish list items will be shown here.</div>
    </UserLayout>
  );
}
