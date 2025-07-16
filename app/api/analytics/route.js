import { connectDB } from '@/lib/mongoose';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await connectDB();

    const posts = await Post.find({ authorId: userId });

    const totalPosts = posts.length;
    const published = posts.filter(p => p.status === 'published').length;
    const drafts = posts.filter(p => p.status === 'draft').length;
    const totalViews = posts.reduce((acc, post) => acc + (post.views || 0), 0);

    return NextResponse.json({ totalPosts, published, drafts, totalViews });
  } catch (err) {
    console.error('Analytics API error:', err);
    return NextResponse.json({ error: 'Failed to load analytics' }, { status: 500 });
  }
}
