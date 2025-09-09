'use client'
import AdminLayout from '@/components/Layout/AdminLayout';
import { ROLES } from '@/utils/roles';
import { useUserStore } from '@/zustand/userStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, Button } from 'antd';
import { User } from '@/types/userType';

export default function UserManagePage() {
  const { users, fetchUsers, deleteUser } = useUserStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteUser(id);
    } catch (err) {
      setError((err as Error).message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  }, [deleteUser]);


  const columns = useMemo(() => [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as const,
      render: (_: unknown, record: User) => (
        <Button
          danger
          onClick={() => handleDeleteUser(record.id)}
          loading={loading}
          disabled={loading}
        >
          Delete
        </Button>
      ),
    },
  ], [handleDeleteUser]); ;


  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <Table
        dataSource={users.filter(userItem => userItem?.role !== ROLES.ADMIN)}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </AdminLayout>
  );
}
