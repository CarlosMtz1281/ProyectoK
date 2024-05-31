import axios from 'axios';

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  sameSite?: 'strict' | 'lax' | 'none';
  path?: string;
}

// For simpler syntax on the code, we make a function
export async function SetCookieAPI(
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  try {
    const response = await axios.post('/api/setCookie', {
      name,
      value,
      options,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}
