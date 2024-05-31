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
export async function getCookies(): Promise<any> {
  try {
    const response = await axios.get('/api/cookies');
    return response.data;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}

// We get the specific cookie
export async function getCookie(name: string): Promise<any> {
    const res = await getCookies();
    console.log("res", res.cookies);
    const cookie = res.cookies.find((element: any) => element.name === name);
    if (cookie) {
        console.log(cookie.value);
        return cookie.value;
    }
}
