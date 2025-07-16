'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }
localStorage.removeItem('userId');
localStorage.setItem('userId', data.userId);

window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-2xl font-bold text-center p-3 text-teal-500">Log In</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mx-auto max-w-md">
        <label className='font-bold'>Enter your email</label>
        <input type="email" placeholder="Email" required className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label className='font-bold'>Enter your password</label>
        <input type="password"placeholder="Password" required className="border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
