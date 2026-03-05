import { NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/store'; // ✅ from store now

export async function GET() {
  try {
    const reviews = getReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newReview = addReview(body);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}
