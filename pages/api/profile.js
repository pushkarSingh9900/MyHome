import { getUserById, updateUser } from '../../lib/user';
import { getCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  const session = getCookie(req, 'session');
  if (!session || !session.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const user = await getUserById(session.userId);
      res.status(200).json(user);
    } catch (err) {
      console.error('Error fetching profile', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    const { name } = req.body;
    try {
      await updateUser(session.userId, { Name: name });
      res.status(200).json({ message: 'Profile updated' });
    } catch (err) {
      console.error('Error updating profile', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
