"use client";
import UserLayout from '@/components/Layout/UserLayout';
import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin, Alert } from 'antd';
import { Post } from '@/types/postType';

export default function BlogPageDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setLoading(true);
        fetch(`/api/posts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found');
                return res.json();
            })
            .then(data => {
                setPost(data);
                setError(null);
            })
            .catch(() => setError('Post not found'))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <UserLayout>
            <div className="flex justify-center mt-8">
                <Card className="w-full max-w-2xl shadow-lg border-0">
                    {loading ? (
                        <div className="flex justify-center items-center h-40"><Spin size="large" /></div>
                    ) : error ? (
                        <Alert type="error" message={error} />
                    ) : post ? (
                        <>
                            <Typography.Title level={2} className="!mb-2 !text-blue-700">{post.title}</Typography.Title>
                            <div className="text-gray-400 text-xs mb-4">{new Date(post.createdAt).toLocaleString()}</div>
                            <Typography.Paragraph className="text-lg leading-relaxed">{post.content}</Typography.Paragraph>
                        </>
                    ) : null}
                </Card>
            </div>
        </UserLayout>
    );
}