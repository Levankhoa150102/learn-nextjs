import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const postsFile = path.join(process.cwd(), 'app', 'api', 'posts', 'posts.json');

// GET /api/posts
export async function GET() {
  const file = await fs.readFile(postsFile, 'utf-8');
  const posts = JSON.parse(file);
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(req: Request) {
  const data = await req.json();
  const file = await fs.readFile(postsFile, 'utf-8');
  const posts = JSON.parse(file);
  const newPost = { id: Date.now(), ...data };
  posts.push(newPost);
  await fs.writeFile(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
  return NextResponse.json(newPost, { status: 201 });
}
