// pages/api/setCookie.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '@/app/utils/cookie';

// We extend type NextApiRequest so that we can extract a specific cookie value
interface SetCookieRequest extends NextApiRequest {
    body: {
      name: string;
      value: string;
      options?: {
        httpOnly?: boolean;
        secure?: boolean;
        maxAge?: number;
        sameSite?: 'strict' | 'lax' | 'none';
        path?: string;
      };
    };
  }
  
  // It will return 200 on success, 400 or 405 on failure.
  export default function handler(req: SetCookieRequest, res: NextApiResponse): void {
    if (req.method === 'POST') {
      const { name, value, options } = req.body;
  
      if (!name || !value) {
        res.status(400).json({ message: 'Cookie name and value are required' });
        return;
      }
  
      setCookie(res, name, value, options);
      res.status(200).json({ message: 'Cookie set' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }