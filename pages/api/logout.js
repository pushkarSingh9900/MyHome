// pages/api/logout.js
import { removeCookie } from '../../lib/cookies';

export default function handler(req, res) {
  removeCookie(res, 'session');
  res.status(200).json({ message: 'Logged out' });
}
