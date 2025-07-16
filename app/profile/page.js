'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
const [profilePicUrl, setProfilePicUrl] = useState('');
  const router = useRouter();

 useEffect(() => {
  const fetchProfile = async () => {
    const id = localStorage.getItem('userId');
    if (!id) return;

    try {
      const res = await fetch(`/api/profile?userId=${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Fetch error');

      setUserId(id);
      setName(data.name || '');
      setUsername(data.username || '');
      setBio(data.bio || '');
      setProfilePicUrl(data.profilePicUrl || '');
    } catch (err) {
      console.error(err);
      toast.error('Profile fetch failed');
    }
  };

  fetchProfile();
}, []);


const handleSave = async () => {
  try {
    const res = await fetch(`/api/profile`, {
      method: 'POST', // use POST not PATCH, since your route expects POST to save/update
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, name, username, bio, profilePicUrl }),
    });

    if (!res.ok) throw new Error('Failed to update profile');

    toast.success('✅ Profile updated!');
  } catch (err) {
    console.error('Save error', err);
    toast.error('❌ Failed to save profile');
  }
};


  return (
    <div className="pt-20 text-center px-4">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-teal-600 mb-6">👤 Your Profile</h1>

      <div className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Short bio"
          className="w-full border p-2 rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          className="w-full border p-2 rounded"
          value={profilePicUrl}
          onChange={(e) => setProfilePicUrl(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2 mx-auto"
        >
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}
