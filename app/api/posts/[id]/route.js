import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose'; 

export async function GET(_, { params }) {
  try {
    const { id } = params; 

    const { default: Post } = await import('@/models/Post.js');  
    await connectDB();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error('❌ GET /api/posts/[id] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  try {
    const { default: Post } = await import('@/models/Post.js');
    await connectDB();

    const deleted = await Post.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error("❌ DELETE error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
