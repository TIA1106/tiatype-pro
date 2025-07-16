import { connectDB } from '@/lib/mongoose.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("📥 Request received");

    const { default: Auth } = await import('@/models/Auth.js');
    const body = await req.json();
    console.log("🧾 Body:", body);

    const { email, password } = body;

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectDB();
    console.log("✅ Connected to DB");

    const existing = await Auth.findOne({ email });
    if (existing) {
      console.log("⚠️ Email already exists:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = new mongoose.Types.ObjectId();

    const newUser = await Auth.create({ _id: userId, email, passwordHash });
    console.log("✅ User created:", newUser);

    return NextResponse.json({ message: "User created", userId });
  } catch (err) {
    console.error("❌ Final Caught Error:", err.message, err.stack);
    return NextResponse.json({ error: "Internal Error", detail: err.message }, { status: 500 });
  }
}
