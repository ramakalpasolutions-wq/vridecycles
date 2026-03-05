import { NextResponse } from 'next/server';
import { getCycles, addCycle } from '@/lib/store';

export async function GET() {
  try {
    const cycles = getCycles();
    return NextResponse.json(cycles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cycles' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newCycle = addCycle(body);
    return NextResponse.json(newCycle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add cycle' }, { status: 500 });
  }
}
