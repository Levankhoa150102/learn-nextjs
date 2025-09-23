'use client';

import React, { useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { UserOutlined, BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NotificationAdmin } from '@/components/NotificationAdmin';
import AdminLayout from '@/components/Layout/AdminLayout';
import { useNotificationStore } from '@/zustand/notificationStore';
import { useUserStore } from '@/zustand/userStore';

const { Title } = Typography;

export default function AdminDashboard() {
  const { notifications, getUnreadCount } = useNotificationStore();
  const { users, fetchUsers } = useUserStore();
  const unreadCount = getUnreadCount();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Title level={2} className="text-gray-800 mb-2">
              Admin Dashboard
            </Title>
            <p className="text-gray-600">
              Manage notifications and monitor system activities
            </p>
          </div>

          {/* Stats Overview */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={users.filter(user => user.role === 'user').length}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Notifications"
                  value={notifications.length}
                  prefix={<BellOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Read Notifications"
                  value={notifications.length - unreadCount}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Unread Notifications"
                  value={unreadCount}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <NotificationAdmin />
            </Col>
          </Row>
        </div>
      </div>
    </AdminLayout>
  );
}