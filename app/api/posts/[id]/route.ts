import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Post } from '@/types/postType';

const postsFile = path.join(process.cwd(), 'app/api/posts/posts.json');

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const data = await fs.readFile(postsFile, 'utf-8');
  const posts = JSON.parse(data);
  const post = posts.find((p: Post) => String(p.id) === String(id));
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}
