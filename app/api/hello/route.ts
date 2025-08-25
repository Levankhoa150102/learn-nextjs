import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from App Router API!' });
}


export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ message: "Blog created", blog: data });
}