import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set('accessToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
  res.cookies.set('refreshToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;
}
