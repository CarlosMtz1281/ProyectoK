import axios from 'axios';

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

// options
const options = {
    httpOnly: true,
    secure: true,
    maxAge: 7200, // 2 hours
    sameSite: 'lax',
}

// For simpler syntax on the code, we make a function
export async function SetCookieAPI(
  name: string,
  value: string,
): Promise<void> {
  try {
    const response = await axios.post('/api/cookies', {
      name: name,
      value: value,
      options: {
        httpOnly: true,
        secure: true,
        maxAge: 7200, // 2 hours
        sameSite: 'lax',
    },
    });
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}
