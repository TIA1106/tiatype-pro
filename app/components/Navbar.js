"use client";
import { useEffect, useState } from "react";
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkMode = savedTheme === "dark" || (!savedTheme && prefersDark);

    document.documentElement.classList.toggle("dark", isDarkMode);
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };
  return (
<nav className="bg-teal-700 dark:bg-teal-900 text-white flex items-center fixed w-full p-3 justify-between">
        <div><Link href="/"><button className='font-extrabold text-2xl cursor-pointer'>TiaType</button></Link></div>
        <div>
        <ul className='flex gap-5 items-center'>
                <li><Link href="/login"><button className=' cursor-pointer bg-blue-600 hover:bg-blue-700 font-semibold px-2 py-1 rounded'>Login</button></Link></li>
                <li><Link href="/signup"><button  className="cursor-pointer bg-green-900 hover:bg-green-700 px-2 py-1 rounded font-semibold">Signup</button></Link></li>
                <li><Link href="/profile" className="cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded">Profile</Link>
</li>
<li><Link href="/analytics" className="cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded">
  Analytics
</Link>
</li>
                <li><Link href="/dashboard"><button className='cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded'>Dashboard</button></Link></li>
                <li><Link href="/create-post"><button className='cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded'>Create</button></Link></li>
                <li><Link href="/about"><button className='cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded'>About Us</button></Link></li>
                <li><Link href="/contact"><button className='cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded'>Contact Us</button></Link></li>
                <li><Link href="/"><button
          onClick={() => {
            localStorage.removeItem('userId');
          }}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer font-semibold"
        >
          Logout
        </button></Link></li>
        <button
      onClick={toggleTheme}
      className="cursor-pointer font-semibold hover:bg-teal-600 bg-teal-700 py-1 px-2 rounded"
    >
      {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
                </ul>
                </div>

    </nav>
  )
}

export default Navbar