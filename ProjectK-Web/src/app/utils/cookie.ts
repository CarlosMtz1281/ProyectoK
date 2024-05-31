// utils/cookies.ts
import { NextApiResponse } from 'next';
import cookie from 'cookie';

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

// Function that sets a cookie based on a specific name and a specific value
export function setCookie(res: NextApiResponse, name: string, value: string, options: CookieOptions = {}): void {
  const serializedCookie = cookie.serialize(name, value, {
    httpOnly: options.httpOnly ?? true,
    // secure: options.secure ?? process.env.NODE_ENV !== 'development',
    maxAge: options.maxAge ?? 3600,
    sameSite: options.sameSite ?? 'strict',
    path: options.path ?? '/',
  });
  res.setHeader('Set-Cookie', serializedCookie);
}

export function parseCookies(req?: { headers: { cookie?: string } }): Record<string, string> {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
