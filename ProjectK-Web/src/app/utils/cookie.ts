'use server'

// utils/cookies.ts
import { NextApiResponse } from "next";
import cookie from "cookie";
import { cookies } from "next/headers";
interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
}

// Function that sets a cookie based on a specific name and a specific value
export async function setCookie(
  res: NextApiResponse,
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<any> {
  const serializedCookie = cookie.serialize(name, value, {
    httpOnly: options.httpOnly ?? true,
    // secure: options.secure ?? process.env.NODE_ENV !== 'development',
    maxAge: options.maxAge ?? 3600,
    sameSite: options.sameSite ?? "strict",
    path: options.path ?? "/",
  });
  cookies().set(name, value, options);
}

