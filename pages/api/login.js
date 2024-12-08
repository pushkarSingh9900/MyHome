
import { validateUser } from '../../lib/user';
import { setCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const user = await validateUser(email, password);
      if (user) {
        // Enforce email domain check
        if (!user.Email.endsWith('@lakeheadu.ca')) {
          res.status(401).json({ message: 'Email must end with @lakeheadu.ca' });
          return;
        }

        // Set cookie with minimal user information (e.g., user ID)
        setCookie(res, 'session', { userId: user.Id }, { maxAge: 60 * 60 * 24 }); // 1 day

        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      console.error('Login error', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
