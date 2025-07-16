'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function ProfileSetupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    bio: '',
    profileImage: '',
  });
  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      router.push('/login');
    } else {
      setUserId(id);
    }
  }, [router]);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
  userId,
  name: formData.fullName,
  username: formData.username,
  bio: formData.bio,
  profilePicUrl: formData.profileImage,
}),
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || 'Failed to save profile');
      return;
    }

    toast.success('✅ Profile setup complete!');
    router.push('/dashboard'); 
  } catch (err) {
    console.error(err);
    toast.error('❌ Error saving profile');
  }
};

  return (
    <div className="pt-20 min-h-screen text-center">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-teal-600 mb-6">👤 Set Up Your Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />

        <textarea
          placeholder="Short bio"
          className="border p-2 rounded"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          required
        />

        <input
          type="url"
          placeholder="Profile Image URL"
          className="border p-2 rounded"
          value={formData.profileImage}
          onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
          required
        />

        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2 rounded mt-2"
        >
          🚀 Save & Continue
        </button>
      </form>
    </div>
  );
}
