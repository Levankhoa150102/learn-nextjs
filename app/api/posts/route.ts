import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Post } from '@/types/postType';

const postsFile = path.join(process.cwd(), 'app/api/posts/posts.json');

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const data = await fs.readFile(postsFile, 'utf-8');
  let posts = JSON.parse(data);
  if (userId) {
    posts = posts.filter((post: Post) => String(post.userId) === String(userId));
  }
  return NextResponse.json(posts);
}
