import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cycle from '@/lib/models/Cycle';

export async function GET() {
  try {
    await connectDB();
    const cycles = await Cycle.find().sort({ createdAt: -1 });
    return NextResponse.json(cycles);
  } catch (error) {
    console.error('GET cycles error:', error);
    return NextResponse.json({ error: 'Failed to fetch cycles' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const cycle = await Cycle.create(body);
    return NextResponse.json(cycle, { status: 201 });
  } catch (error) {
    console.error('POST cycle error:', error);
    return NextResponse.json({ error: 'Failed to create cycle' }, { status: 500 });
  }
}
