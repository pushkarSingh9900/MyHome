// pages/home.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch('/api/checkAuth', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          router.push('/login');
        }
      });
  }, []);

  const fetchHouses = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/houses?${query}`);
    const data = await res.json();
    setHouses(data);
  };

  useEffect(() => {
    fetchHouses();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Houses</h1>
      <div>
        <h3>Filters</h3>
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={handleFilterChange}
        />
        {/* Add more filters as needed */}
      </div>
      <div>
        {houses.map((house) => (
          <div key={house.Id}>
            <h2>{house.Title}</h2>
            <p>{house.Description}</p>
            <p>Location: {house.Location}</p>
            <p>Price: ${house.Price}</p>
            <p>Bedrooms: {house.Bedrooms}</p>
            <p>Bathrooms: {house.Bathrooms}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
