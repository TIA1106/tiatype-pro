'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error('Failed to load post', err));
  }, [id]);

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-20 min-h-screen">
      <div className='mx-auto max-w-4xl text-center'>
      <h1 className="text-3xl font-bold p-3">{post.title}</h1>
      <p className="text-gray-500 p-3">Written by user {post.authorId}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
