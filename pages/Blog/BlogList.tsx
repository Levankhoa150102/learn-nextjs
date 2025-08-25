import Link from 'next/link';
import { Suspense } from 'react';
export type PostProps = {
    id: string;
    title: string;
};

async function getPosts(): Promise<PostProps[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
}

export default async function BlogList() {
    const posts = await getPosts();
        return (
        <Suspense fallback={<div>Loading by Suspense</div>}>
            <ul>
                {posts.map((item) => (
                    <li key={item.id}>
                        <Link href={`/blog/${item.id}`} >
                            {item.title}
                        </Link>
                    </li>

                ))}
            </ul>
        </Suspense>
    );
}
