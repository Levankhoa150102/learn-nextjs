import { User } from '@/types/userType';
import { Modal } from 'antd';
import React from 'react';
type UserModalProps = {
    user: User | undefined;
    open: boolean;
    onClose: () => void;
};
function UserModal({ user, open, onClose }: UserModalProps) {
    return (
        <Modal open={open} onCancel={onClose} footer={null} centered title={<span className="text-xl font-bold text-blue-700">User Details</span>}>
            <div className="space-y-4 p-2">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-600">User ID:</span>
                    <span className="text-gray-900">{user?.id}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-600">Username:</span>
                    <span className="text-gray-900">{user?.username}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-600">Role:</span>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium capitalize">{user?.role}</span>
                </div>
            </div>
        </Modal>
    );
}

export default UserModal;