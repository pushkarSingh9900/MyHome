// pages/api/checkAuth.js
import { getCookie } from '../../lib/cookies';

export default function handler(req, res) {
  const session = getCookie(req, 'session');
  if (session && session.userId) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(401).json({ authenticated: false });
  }
}
