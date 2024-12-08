
import { serialize, parse } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);

  options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    // maxAge: 60 * 60 * 24 * 7, // 1 week
    ...options,
  };

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
}

export function getCookie(req, name) {
  const cookies = parse(req.headers.cookie || '');
  const value = cookies[name];
  if (!value) return null;

  if (value.startsWith('j:')) {
    try {
      return JSON.parse(value.slice(2));
    } catch (err) {
      return null;
    }
  }
  return value;
}

export function removeCookie(res, name) {
  setCookie(res, name, '', { maxAge: -1 });
}
