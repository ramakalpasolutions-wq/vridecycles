import { NextResponse } from 'next/server';
import { getCycleById, updateCycle, deleteCycle } from '@/lib/store';

export async function GET(request, { params }) {
  const { id } = await params;
  const cycle = getCycleById(id);
  if (!cycle) {
    return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
  }
  return NextResponse.json(cycle);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const updated = updateCycle(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cycle' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteCycle(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
