// pages/home.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const [houses, setHouses] = useState([]);
  const [filters, setFilters] = useState({ maxDistance: '' }); // Added maxDistance filter
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    fetch("/api/checkAuth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/login");
        }
      });
  }, []);

  const fetchHouses = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`/api/houses?${query}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setHouses(data);
    } else {
      console.error("Error fetching houses:", data.message);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemove = (id) => {
    setHouses((prevHouses) => prevHouses.filter((house) => house.Id !== id));
  };

  const handleInterested = (id) => {
    alert(`Landlord has been notified. They will get back with you shortly.`);
  };

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div>
          <h1 className="text-xl font-bold">MyHome</h1>
        </div>
        <div>
          <button
            onClick={() => router.push("/profile")}
            className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-bold">Available Houses</h2>
        {/* Filters */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Filters</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="maxDistance"
              placeholder="Max Distance (km)"
              onChange={handleFilterChange}
              className="px-3 py-2 border rounded"
            />
          </div>
        </div>

        {/* Houses List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {houses.map((house) => (
            <div key={house.Id} className="p-4 bg-white rounded shadow">
              <h3 className="mb-2 text-xl font-bold">{house.Title}</h3>
              <p className="mb-2">{house.Description}</p>
              <p className="mb-1">Location: {house.Location}</p>
              <p className="mb-1">Price: ${house.Price}</p>
              <p className="mb-1">Bedrooms: {house.Bedrooms}</p>
              <p className="mb-1">Bathrooms: {house.Bathrooms}</p>
              <p className="mb-1">Distance: {house.DistanceFromLakehead} km</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleInterested(house.Id)}
                >
                  Interested
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleRemove(house.Id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
