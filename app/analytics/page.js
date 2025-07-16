'use client';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function AnalyticsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?authorId=${userId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch');

        setPosts(data);
      } catch (err) {
        console.error("Analytics Fetch Error:", err);
        toast.error("Error loading analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const total = posts.length;
  const published = posts.filter(p => p.status === 'published').length;
  const drafts = posts.filter(p => p.status === 'draft').length;

  return (
    <div className="pt-20 min-h-screen px-4">
      <Toaster position="top-right" />
      
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-teal-600 dark:text-teal-300 mb-8">
        📊 Your Post Analytics
      </h1>

      {loading ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400 animate-pulse">Loading...</p>
      ) : total === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">
          You haven't written any posts yet... 📝 Start creating magic!
        </p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto sm:grid-cols-3">
          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-500">{total}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Posts</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-500">{published}</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">Published</p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-gray-500">{drafts}</h2>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Drafts</p>
          </div>
        </div>
      )}

      {total > 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
          ✨ Keep writing. You're building something awesome.
        </p>
      )}
    </div>
  );
}
