// pages/profile.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setName(data.Name);
        } else {
          router.push('/login');
        }
      });
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
      credentials: 'include',
    });
    if (res.ok) {
      alert('Profile updated successfully.');
    } else {
      alert('Failed to update profile.');
    }
  };
  
  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/login');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div>
          <h1 className="text-xl font-bold">Student Home Finder</h1>
        </div>
        <div>
          <button
            onClick={() => router.push('/home')}
            className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Profile</h2>
      <form onSubmit={handleUpdateProfile} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Email</label>
          <input
            type="email"
            value={user.Email}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
}
