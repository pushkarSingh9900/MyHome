// pages/api/houses.js
import { getHouses } from '../../lib/house';
import { getCookie } from '../../lib/cookies';

export default async function handler(req, res) {
  const session = getCookie(req, 'session');
  if (!session || !session.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const filter = {
      location: req.query.location,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
      bedrooms: req.query.bedrooms ? parseInt(req.query.bedrooms) : undefined,
      maxDistance: req.query.maxDistance ? parseFloat(req.query.maxDistance) : undefined,
    };

    const houses = await getHouses(filter);
    res.status(200).json(houses);
  } catch (err) {
    console.error('Error fetching houses', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
