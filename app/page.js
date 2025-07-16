'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      router.push('/dashboard');
    }
  }, []);

  return (
    <main className="min-h-screen ">
      <section className="grid grid-cols-2 h-dvh">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h1 className="text-4xl font-extrabold text-center ">✨TiaType Welcomes You✨</h1>
          <p className="font-bold text-2xl text-center">
            A genuine blog platform to write, share, and express your thoughts.
          </p>
          <div className="gap-4 flex text-white">
            <button
              onClick={() => router.push('/signup')}
              className="cursor-pointer bg-green-900 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
            >
              Signup
            </button>
            <button
              onClick={() => router.push('/login')}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              Login
            </button>
          </div>
        </div>
        <div className="flex justify-start">
          <Image className="mix-blend-normal" alt="image" src="/work.png" width={900} height={400} />
        </div>

      </section>
    </main>
  );
}
