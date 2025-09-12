import { NextRequest, NextResponse } from 'next/server';
import { signAccessToken, verifyRefreshToken } from '@/utils/jwt';
type JwtPayload = { id: string; username: string; role: string };

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;
  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }
  try {
    const payload = verifyRefreshToken(refreshToken) as JwtPayload;
    const accessToken = signAccessToken({ id: payload.id, username: payload.username, role: payload.role });
    const res = NextResponse.json({ accessToken });
    res.cookies.set('accessToken', accessToken, { httpOnly: true, sameSite: 'lax', path: '/' });
    return res;
  } catch{
    return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
  }
}
