// src/app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

type UserProfile = {
  id: number;
  email: string;
  phone_no: string | null;
  name: string;
  national_id: string;
  province: string;
  district: string;
  is_email_verified: boolean;
  is_verified: boolean;
  created_at: string;
  profile: {
    address: string | null;
    subdistrict: string | null;
    district: string | null;
    town: string | null;
    province: string | null;
    postal_code: string | null;
    bpjs_no: string | null;
  } | null;
};

export default function ProfilePage() {
  const { isSignedIn, user } = useUser();
  const [pUser, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user?.emailAddresses[0]?.emailAddress }),
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data: UserProfile = await res.json();
        setUser(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            [name]: value,
            profile: prevUser.profile
              ? { ...prevUser.profile, [name]: value }
              : null,
          }
        : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await res.json();
      setUser(updatedUser); // Update state with the new data
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
    }
  };

 

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={pUser?.name}
            onChange={handleChange}
            className="block w-full border p-2 mb-4"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_no"
            value={pUser?.phone_no || ''}
            onChange={handleChange}
            className="block w-full border p-2 mb-4"
          />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={pUser?.province}
            onChange={handleChange}
            className="block w-full border p-2 mb-4"
          />
        </label>
        <label>
          District:
          <input
            type="text"
            name="district"
            value={pUser?.district}
            onChange={handleChange}
            className="block w-full border p-2 mb-4"
          />
        </label>

        {pUser?.profile && (
          <>
            <h2 className="text-xl font-semibold mt-6">Additional Profile Information</h2>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={pUser?.profile?.address || ''}
                onChange={handleChange}
                className="block w-full border p-2 mb-4"
              />
            </label>
            <label>
              Subdistrict:
              <input
                type="text"
                name="subdistrict"
                value={pUser?.profile?.subdistrict || ''}
                onChange={handleChange}
                className="block w-full border p-2 mb-4"
              />
            </label>
            <label>
              Town:
              <input
                type="text"
                name="town"
                value={pUser?.profile?.town || ''}
                onChange={handleChange}
                className="block w-full border p-2 mb-4"
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                name="postal_code"
                value={pUser?.profile?.postal_code || ''}
                onChange={handleChange}
                className="block w-full border p-2 mb-4"
              />
            </label>
            <label>
              BPJS No:
              <input
                type="text"
                name="bpjs_no"
                value={pUser?.profile?.bpjs_no || ''}
                onChange={handleChange}
                className="block w-full border p-2 mb-4"
              />
            </label>
          </>
        )}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
