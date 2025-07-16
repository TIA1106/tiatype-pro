import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose.js';
import Profile from '@/models/Profile';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const profile = await Profile.findOne({ userId: params.id });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (err) {
    console.error('Profile GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
