import BlogDetail from '@/pages/Blog/BlogDetail';

interface BlogPageDetailProps {
    params: Promise<{ id: string }>
}

export default async function BlogPageDetail(props:  BlogPageDetailProps) {
    const params = await props.params;
    const { id } = params;

    return <BlogDetail id={id} />;
}
