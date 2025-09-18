import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  // Clear custom JWT cookies
  res.cookies.set('accessToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
  res.cookies.set('refreshToken', '', { httpOnly: true, expires: new Date(0), path: '/' });
  // Clear NextAuth session cookie (for OAuth)
  res.cookies.set('authjs.session-token', '', { httpOnly: true, expires: new Date(0), path: '/' });
  res.cookies.set('authjs.csrf-token', '', { httpOnly: true, expires: new Date(0), path: '/' });
  res.cookies.set('authjs.callback-url', '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;

}
