'use client'

import { useEffect, useState } from "react";
type Post = {
  id: number;
  title: string;
  content: string;
}
export default function Home() {
  const [post, setPost] = useState<Post[]>([]);

  async function fetchPosts() {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPost(data);
  }

  async function createPosts(title: string, content: string) {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    await response.json();
    fetchPosts(); 
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement)?.value;
    const content = (e.currentTarget.elements.namedItem("content") as HTMLTextAreaElement)?.value;
    createPosts(title, content);
    e.currentTarget.reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" />
        <textarea name="content" placeholder="Content"></textarea>
        <button type="submit">Create Post</button>
      </form>

      <div>
        <h1>View All Posts</h1>
        <ul>
          {post.map((p) => (
            <li key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
