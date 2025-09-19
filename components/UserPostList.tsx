"use client";
import React, { useEffect, useState } from 'react';
import { Spin, List, Typography } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
}

const UserPostList: React.FC = () => {
  const { user, loading: userLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/posts?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, [user]);

  if (userLoading || loading) return <Spin />;
  if (posts.length === 0) return <div>No items found.</div>;

  const handleViewDetails = (postId: number) => () => {
    router.push(`/user/item-list/${postId}`);
  };

  return (
    <List
      dataSource={posts}
      renderItem={item => (
        <List.Item key={item.id} onClick={handleViewDetails(item.id)} className="cursor-pointer hover:bg-gray-50">
          <div>
            <Typography.Title level={5}>{item.title}</Typography.Title>
            <div className="text-gray-500 text-xs mb-1">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default UserPostList;
