import { NextResponse } from 'next/server';
// import { promises as fs } from 'fs';

// const postsFile = path.join(process.cwd(), 'app', 'api', 'posts', 'posts.json');
const posts = [
  {
    "id": 1,
    "title": "Hello Next.js",
    "content": "This is my first post"
  },
  {
    "id": 2,
    "title": "App Router",
    "content": "Learning about Route Handlers"
  },
  {
    "id": 1756107259999,
    "title": "I'll be there",
    "content": "Orange"
  },
  {
    "id": 1756107289173,
    "title": "So dam",
    "content": "Muoii"
  },
  {
    "id": 1756107397135,
    "title": "Ga san ca",
    "content": "Maiqqin"
  },
  {
    "id": 1756107467646,
    "title": "Chang the cung",
    "content": "Doa hoa tan troi lac giua khong gian"
  },
  {
    "id": 1756107858405,
    "title": "Dieu em luon mong muon",
    "content": "Moshi Moshi"
  }
]
// GET /api/posts
export async function GET() {
  // const file = await fs.readFile(postsFile, 'utf-8');
  // const posts = JSON.parse(file);
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(req: Request) {
  const data = await req.json();
  // const file = await fs.readFile(postsFile, 'utf-8');
  // const posts = JSON.parse(file);
  const newPost = { id: Date.now(), ...data };
  posts.push(newPost);
  // await fs.writeFile(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
  return NextResponse.json(newPost, { status: 201 });
}
