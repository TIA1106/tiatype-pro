'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserProfilePage() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('username') || 'Anonymous';
    if (!id) router.push('/login');
    else {
      setUserId(id);
      setUsername(name);
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?authorId=${userId}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Profile Fetch Error:', err);
      }
    };
    fetchPosts();
  }, [userId]);

  const totalPosts = posts.length;
  const published = posts.filter((p) => p.status === 'published').length;
  const drafts = posts.filter((p) => p.status === 'draft').length;
  const totalWords = posts.reduce((acc, post) => acc + post.content.trim().split(/\s+/).length, 0);
  const avgReadTime = Math.ceil(totalWords / 200);

  return (
    <div className="pt-20 min-h-screen px-6 sm:px-10">
      <h1 className="text-3xl font-bold text-center text-teal-500">👤 Your Profile</h1>

      <div className="mt-6 bg-white dark:bg-gray-900 shadow-md rounded p-6 max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <img
            src="/avatar.svg"
            alt="Avatar"
            className="w-24 h-24 rounded-full border mb-3"
          />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{username}</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Author ID: {userId}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-lg font-bold text-blue-600">{totalPosts}</h3>
            <p className="text-sm text-gray-500">Total Posts</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-green-600">{published}</h3>
            <p className="text-sm text-gray-500">Published</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-yellow-600">{drafts}</h3>
            <p className="text-sm text-gray-500">Drafts</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-purple-600">{avgReadTime} min</h3>
            <p className="text-sm text-gray-500">Avg. Read Time</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">📝 Recent Posts</h3>
          <ul className="space-y-2">
            {posts.slice(0, 5).map((post) => (
              <li key={post._id} className="border rounded px-4 py-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 dark:text-white">{post.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
