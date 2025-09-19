import { Modal } from 'antd'
import React from 'react'
type ConfirmModalProps = {
    title: string;
    content?: string;
    onConfirm: () => void;
    onCancel: () => void;
    visible: boolean;
}
export default function ConfirmModal({ title, content, onConfirm, onCancel, visible }: ConfirmModalProps) {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/></svg>
          </span>
          <span className="font-semibold text-lg text-blue-700">{title}</span>
        </div>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      centered
      okText={"Confirm"}
      cancelText={"Cancel"}
    >
      <p className="text-gray-700 text-base mb-2">{content}</p>
    </Modal>
  );
}
