import { NextResponse } from 'next/server';
import { deleteReview, toggleReviewApproval } from '@/lib/store'; // ✅

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteReview(id);
  if (!deleted) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const updated = toggleReviewApproval(id);
  if (!updated) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}
