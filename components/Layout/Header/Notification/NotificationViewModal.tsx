import React from 'react';
import { Modal, Button } from 'antd';
import {
  CheckOutlined,
  MessageOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Notification } from '@/zustand/notificationStore';
import formatDate from '@/utils/formatDate';

interface NotificationViewModalProps {
  notification: Notification | null;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export default function NotificationViewModal({
  notification,
  open,
  onClose,
  onDelete
}: NotificationViewModalProps) {

const getTypeConfig = (type: string) => {
    switch (type) {
      case 'success':
        return {
          icon: <CheckOutlined className="text-white" />,
          bgColor: 'bg-green-500',
          lightBg: 'bg-green-50',
          borderColor: 'border-green-200',
          tagBg: 'bg-green-100',
          tagText: 'text-green-800',
          tagLabel: 'Success'
        };
      case 'warning':
        return {
          icon: <WarningOutlined className="text-white" />,
          bgColor: 'bg-orange-500',
          lightBg: 'bg-orange-50',
          borderColor: 'border-orange-200',
          tagBg: 'bg-orange-100',
          tagText: 'text-orange-800',
          tagLabel: 'Warning'
        };
      case 'error':
        return {
          icon: <CloseCircleOutlined className="text-white" />,
          bgColor: 'bg-red-500',
          lightBg: 'bg-red-50',
          borderColor: 'border-red-200',
          tagBg: 'bg-red-100',
          tagText: 'text-red-800',
          tagLabel: 'Error'
        };
      case 'info':
      default:
        return {
          icon: <InfoCircleOutlined className="text-white" />,
          bgColor: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          borderColor: 'border-blue-200',
          tagBg: 'bg-blue-100',
          tagText: 'text-blue-800',
          tagLabel: 'Information'
        };
    }
  };


  if (!notification) return null;

  const typeConfig = getTypeConfig(notification.type);
  const createdDate = formatDate(notification.createdAt);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(notification.id);
      onClose();
    }
  };

  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      className="notification-detail-modal"
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="overflow-hidden">
        {/* Header Section */}
        <div className={`px-6 py-6 ${typeConfig.lightBg} ${typeConfig.borderColor} border-b rounded-sm `}>
          <div className="flex items-start justify-between ">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full ${typeConfig.bgColor} flex items-center justify-center flex-shrink-0`}>
                {typeConfig.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeConfig.tagBg} ${typeConfig.tagText}`}>
                    {typeConfig.tagLabel}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 leading-tight">
                  {notification.title}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Sender Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <UserOutlined className="w-5 h-5 mr-2 text-green-500" />
              Sender
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                  <UserOutlined className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-gray-800">
                  {notification.sender.name || 'System'}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {notification.sender.email}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <CalendarOutlined className="w-5 h-5 mr-2 text-orange-500" />
              Timeline
            </h3>
              <div>
                <p className="text-sm text-gray-500 mb-1">Sent:</p>
                <p className="font-medium text-gray-800">
                  {createdDate.date}
                  <span className="text-sm text-gray-500 ml-2">
                    at {createdDate.time}
                  </span>
                </p>
              </div>

          </div>
        </div>

        {/* Content Section */}
        <div className="py-4">
          {/* Message */}
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <MessageOutlined className="w-5 h-5 mr-2 text-blue-500" />
              Message
            </h3>
            <div className="h-fit max-h-[200px] overflow-y-auto bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {notification.message}
              </p>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-4 flex justify-end space-x-3">
          <div className="flex items-center space-x-3">
            <Button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close
            </Button>

            {onDelete && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
