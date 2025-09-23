import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Button, Select, message, Divider } from 'antd';
import { useNotificationStore } from '@/zustand/notificationStore';
import { useUserStore } from '@/zustand/userStore';
import { SendNotificationPayload } from '@/types/notificationType';

const { Option } = Select;
const { TextArea } = Input;

export const NotificationAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [targetType, setTargetType] = useState<'role' | 'user'>('role');
  const { sendNotification } = useNotificationStore();
  const { users, fetchUsers } = useUserStore();

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSubmit = async (values: {
    title: string;
    message: string;
    type: string;
    targetType: 'role' | 'user';
    targetRole?: string;
    targetUserId?: string;
  }) => {
    setLoading(true);
    try {
      const payload: SendNotificationPayload = {
        title: values.title,
        message: values.message,
        type: values.type,
      };
      if (values.targetType === 'role') {
        payload.targetRole = values.targetRole;
      } else {
        payload.targetUserId = values.targetUserId;
      }

      await sendNotification(payload);
      message.success('Notification sent successfully!');
      form.resetFields();
      setTargetType('role');
    } catch {
      message.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Send Notification" className="max-w-2xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          type: 'info',
          targetType: 'role',
          targetRole: 'user'
        }}
        onValuesChange={(changedValues) => {
          if (changedValues.targetType) {
            setTargetType(changedValues.targetType);
          }
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter notification title" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true, message: 'Please enter a message' }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter notification message"
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select a type' }]}
        >
          <Select placeholder="Select notification type">
            <Option value="info">Info</Option>
            <Option value="success">Success</Option>
            <Option value="warning">Warning</Option>
            <Option value="error">Error</Option>
          </Select>
        </Form.Item>

        <Divider>Target Settings</Divider>

        <Form.Item
          name="targetType"
          label="Send To"
          rules={[{ required: true, message: 'Please select target type' }]}
        >
          <Select placeholder="Select target type">
            <Option value="role">Role-based (All users with specific role)</Option>
            <Option value="user">Specific User</Option>
          </Select>
        </Form.Item>

        {targetType === 'role' && (
          <Form.Item
            name="targetRole"
            label="Target Role"
            rules={[{ required: true, message: 'Please select a target role' }]}
          >
            <Select placeholder="Select target role">
              <Option value="user">Users</Option>
              <Option value="admin">Admins</Option>
              <Option value="all">All Users</Option>
            </Select>
          </Form.Item>
        )}

        {targetType === 'user' && (
          <Form.Item
            name="targetUserId"
            label="Select User"
            rules={[{ required: true, message: 'Please select a user' }]}
          >
            <Select
              placeholder="Select a specific user"
              showSearch
              filterOption={(input, option) =>
                (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name || user.email} ({user.role})
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Send Notification
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};