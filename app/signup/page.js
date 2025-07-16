'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }
localStorage.removeItem('userId');
localStorage.setItem('userId', data.userId);
window.location.href = '/profile/setup';
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  return (
    <div className=' min-h-screen pt-20'>
      <h1 className='text-center font-bold text-2xl p-3 text-teal-500'>Sign Up</h1>
      <form onSubmit={handleSignup} className='mx-auto max-w-md flex flex-col gap-4'>
        <label className='font-bold'>Enter Email</label>
        <input type="email" className='border p-2 rounded'required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label className='font-bold'>Create Password</label>
        <input type="password" className='border p-2 rounded' required value={password} onChange={(e) => setPassword(e.target.value)}/>

        {error && <p>{error}</p>}

        <button type="submit" className='bg-teal-500 cursor-pointer text-white font-bold rounded w-fit px-5 py-3 my-3'>
          Create Account
        </button>
      </form>
    </div>
  );
}
