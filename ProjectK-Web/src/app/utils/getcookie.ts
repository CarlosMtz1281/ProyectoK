import axios from 'axios';

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
export async function getCookie(name: string): Promise<string> {
    const res = await getCookies();
    const cookie = res.cookies.find((element: any) => element.name === name);
    if (cookie) {
        console.log(typeof(cookie.value));
        return cookie.value;
    } else {
      return "not found";
    }
}
