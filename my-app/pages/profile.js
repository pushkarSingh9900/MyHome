import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/profile', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push('/login');
        }
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.Email}</p>
          <p>Name: {user.Name}</p>
          {/* Display additional profile information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
