'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState('published');
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      router.push('/login');
      return;
    }
    setUserId(id);
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts?authorId=${userId}&status=${status}`);
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error('Dashboard Fetch Error:', err);
        setPosts([]);
        toast.error("❌ Failed to fetch posts");
      }
    };

    fetchPosts();
  }, [userId, status]);

  const handleDelete = async (postId) => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== postId));
        toast.success("🗑️ Post deleted successfully");
      } else {
        toast.error("❌ Failed to delete post");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Something went wrong");
    }
  };

  return (
    <div className="pt-20 min-h-screen px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />

      <h1 className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-300 text-center">
        Your Blog Posts
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button
          onClick={() => setStatus('published')}
          className={`px-4 py-2 rounded ${
            status === 'published'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-800 dark:text-white'
          }`}
        >
          ✅ Published
        </button>
        <button
          onClick={() => setStatus('draft')}
          className={`px-4 py-2 rounded ${
            status === 'draft'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-800 dark:text-white'
          }`}
        >
          📝 Drafts
        </button>
        <button
          onClick={() => router.push('/create-post')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Create New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-center mt-6">
          No {status} posts found.
        </p>
      ) : (
        <ul className="space-y-4 mt-6">
          {posts.map((post) => (
            <li
              key={post._id}
              className="border dark:border-gray-700 bg-white dark:bg-gray-900 rounded p-4 shadow max-w-4xl mx-auto text-left"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm sm:text-base">
                {post.content.slice(0, 100)}...
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => router.push(`/posts/${post._id}`)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
