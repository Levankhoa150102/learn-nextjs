import BlogDetail from '@/components/BlogDetail';

interface BlogPageDetailProps {
    params: { id: string };
}

export default async function BlogPageDetail(props:  BlogPageDetailProps) {
    const params = await props.params;
    const { id } = params;

    return <BlogDetail id={id} />;
}
