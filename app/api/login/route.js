import { connectDB } from '@/lib/mongoose.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { default: Auth } = await import('@/models/Auth.js');
    const { email, password } = await req.json();

    await connectDB();

    const user = await Auth.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ userId: user._id });
  } catch (err) {
    console.error('❌ LOGIN ERROR:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
