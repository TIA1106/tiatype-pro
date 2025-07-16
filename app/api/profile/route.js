import { connectDB } from '@/lib/mongoose';
import Profile from '@/models/Profile';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, name, bio, username, profilePicUrl } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await connectDB();

    const existing = await Profile.findOne({ userId });

    if (existing) {
      existing.name = name;
      existing.bio = bio;
      existing.username = username;
      existing.profilePicUrl = profilePicUrl;
      await existing.save();
      return NextResponse.json({ success: true, updated: true });
    }

    const profile = new Profile({ userId, name, bio, username, profilePicUrl });
    await profile.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/profile error:', error);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    await connectDB();

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json({
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      profilePicUrl: profile.profilePicUrl,
    });
  } catch (error) {
    console.error('GET /api/profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}