import axios from 'axios';

// For simpler syntax on the code, we make a function
export async function deleteCookie(name: string): Promise<any> {
  try {
    const response = await axios.delete('/api/cookies', {
        data: {
            name: name
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}
