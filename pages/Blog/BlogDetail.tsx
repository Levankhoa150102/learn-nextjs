export type PostDetail = {
  title: string;
  body: string;
};

interface BlogDetailProps {
  id: string;
}

export default async function BlogDetail({ id }: BlogDetailProps) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) return <div>Not found</div>;
  const data = await response.json();
  const postDetail = data as PostDetail;
  return (
    <div>
      <h1>{postDetail.title}</h1>
      <p>{postDetail.body}</p>
    </div>
  );
}
