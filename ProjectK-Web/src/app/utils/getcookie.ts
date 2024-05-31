import cookie from 'cookie';

// Cookie parsing
export function parseCookies(): Record<string, string> {
  return cookie.parse(document.cookie);
}

// We get cookies for the client
export function getCookie(name: string): string | undefined {
  const cookies = parseCookies();
  return cookies[name];
}
