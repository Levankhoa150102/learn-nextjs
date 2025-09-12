'use client';

import React from 'react';
import UserLayout from '@/components/Layout/UserLayout';
import { Button } from 'antd';
import UserPostList from '@/components/UserPostList';

export default function UserItemListPage() {
  return (
    <UserLayout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">Item List</h2>
        <Button>Upload</Button>
      </div>
      <div className="bg-white rounded shadow px-3  min-h-[200px]">
        <UserPostList />
      </div>
    </UserLayout>
  );
}
