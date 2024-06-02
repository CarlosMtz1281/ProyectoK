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
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<any> {
  cookies().set(name, value, options);
}

// Function that deletes a cookie based on a specific name
export async function deleteCookie(name: string): Promise<any> {
  cookies().delete(name)
}

// Function that gets a cookie based on a specific name
export async function getCookie(name: string): Promise<any> {
  return cookies().get(name);
}

