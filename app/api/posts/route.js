import { connectDB } from '@/lib/mongoose';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose'; // ✅ REQUIRED!

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const authorId = searchParams.get('authorId');
    const status = searchParams.get('status');

    if (!authorId) {
      return NextResponse.json({ error: 'Missing authorId' }, { status: 400 });
    }

    await connectDB();

    const query = { authorId };
    if (status) query.status = status;

    const posts = await Post.find(query).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (err) {
    console.error('GET /api/posts error:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { title, content, authorId, status = 'draft' } = await req.json();

    if (!title || !content || !authorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const post = await Post.create({
      title,
      content,
      authorId: new mongoose.Types.ObjectId(authorId), // ✅ Fix this line
      status,
    });

    return NextResponse.json({ message: 'Post created', post });
  } catch (err) {
    console.error('❌ POST /api/posts error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
