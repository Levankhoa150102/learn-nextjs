import React, { useEffect, useRef, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { FiSend } from 'react-icons/fi';
import { User } from '@/types/userType';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  user: User | undefined;
  messages: Message[];
  onSend: (msg: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose, user, messages, onSend }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={<span className="text-lg font-bold text-blue-700">Chat with {user?.name}</span>}
      centered
      width={400}
    >
      <div className="flex flex-col h-96 bg-gray-50 rounded p-2 overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">No messages yet.</div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === user?.name ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs break-words shadow text-sm ${
                  msg.sender === user?.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 border'
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2 mt-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type a message..."
            className="flex-1"
            autoFocus
          />
          <Button type="primary" icon={<FiSend />} onClick={handleSend} disabled={!input.trim()} />
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
