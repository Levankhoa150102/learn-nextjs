import jwt, { JwtPayload } from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

export function signAccessToken(payload: object, expiresIn: string = '15m'): string {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, { expiresIn });
}

export function signRefreshToken(payload: object, expiresIn: string = '7d'): string {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, { expiresIn });
}

export function verifyAccessToken(token: string): string | JwtPayload {
  return jwt.verify(token, ACCESS_TOKEN_SECRET as string);
}

export function verifyRefreshToken(token: string): string | JwtPayload {
  return jwt.verify(token, REFRESH_TOKEN_SECRET as string);
}
