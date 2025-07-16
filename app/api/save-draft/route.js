import Post from '@/models/Post';
import { connectDB } from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const { title, content, authorId } = await req.json();

    const draft = await Post.create({
      title,
      content,
      authorId,
      status: 'draft', 
    });

    return NextResponse.json(draft);
  } catch (error) {
    console.error('❌ Failed to save draft:', error);
    return NextResponse.json({ error: 'Failed to save draft' }, { status: 500 });
  }
}
