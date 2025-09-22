'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import { UserOutlined, BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { NotificationAdmin } from '@/components/NotificationAdmin';
import { NotificationList } from '@/components/NotificationList';
import AdminLayout from '@/components/Layout/AdminLayout';

const { Title } = Typography;

export default function AdminDashboard() {
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
                  value={123}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Notifications"
                  value={456}
                  prefix={<BellOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Read Notifications"
                  value={389}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Unread Notifications"
                  value={67}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: '#f5222d' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Main Content */}
          <Row gutter={[24, 24]}>
            {/* Send Notification Section */}
            <Col xs={24} lg={12}>
              <NotificationAdmin />
            </Col>

            {/* Notifications List Section */}
            <Col xs={24} lg={12}>
              <NotificationList />
            </Col>
          </Row>
        </div>
      </div>
    </AdminLayout>
  );
}