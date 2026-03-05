import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Cycle from '@/lib/models/Cycle';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const cycle = await Cycle.findById(id);
    if (!cycle) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    }
    return NextResponse.json(cycle);
  } catch (error) {
    console.error('GET cycle error:', error);
    return NextResponse.json({ error: 'Failed to fetch cycle' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const body = await request.json();
    const updated = await Cycle.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error('PUT cycle error:', error);
    return NextResponse.json({ error: 'Failed to update cycle' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const deleted = await Cycle.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE cycle error:', error);
    return NextResponse.json({ error: 'Failed to delete cycle' }, { status: 500 });
  }
}
