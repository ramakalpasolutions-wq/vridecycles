import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/lib/models/Review';

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE review error:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    review.approved = !review.approved;
    await review.save();
    return NextResponse.json(review);
  } catch (error) {
    console.error('PATCH review error:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}
