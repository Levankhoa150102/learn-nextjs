'use client'
import AdminLayout from '@/components/Layout/AdminLayout';
import UserModal from '@/components/UserModal';
import { User } from '@/types/userType';
import { ROLES } from '@/utils/roles';
import { useUserStore } from '@/zustand/userStore';
import { Button, Popconfirm, Table } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

  const [pagination, setPagination] = useState<{ current: number; pageSize: number }>({ current: 1, pageSize: 5 });

  const columns = useMemo(() => [
    {
      title: 'No.',
      key: 'no',
      render: (_: unknown, __: unknown, index: number) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
      width: 60,
    },
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
        <Popconfirm
          title="Delete the user"
          description="Are you sure to delete this user?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteUser(record.id)}
          onPopupClick={e => e.stopPropagation()}
        >
          <Button
            danger
            onClick={e => e.stopPropagation()}
          >
            Delete
          </Button>
        </Popconfirm>

      ),
    },
  ], [handleDeleteUser, pagination]);

  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>()
  const handleAction = (record: User) => {
    setOpenActionModal(true);
    setSelectedUser(record);
  };

  const paginationConfig = useMemo(() => ({
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} users`,
  }), []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

      <Table
        dataSource={users.filter(userItem => userItem?.role !== ROLES.ADMIN)}
        className='cursor-pointer'
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
          ...paginationConfig
        }}
        onRow={(record) => ({
          onClick: () => {
            handleAction(record);
          },
        })}
      />
      {openActionModal && <UserModal user={selectedUser} open={openActionModal} onClose={() => setOpenActionModal(false)} />}
    </AdminLayout>
  );
}
