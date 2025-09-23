import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, message } from 'antd';
import { useNotificationStore } from '@/zustand/notificationStore';

const { Option } = Select;
const { TextArea } = Input;

interface NotificationFormData {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole: string;
}

export const NotificationAdmin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { sendNotification } = useNotificationStore();

  const handleSubmit = async (values: NotificationFormData) => {
    setLoading(true);
    try {
      await sendNotification(values);
      message.success('Notification sent successfully!');
      form.resetFields();
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
          targetRole: 'user'
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