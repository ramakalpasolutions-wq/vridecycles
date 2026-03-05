'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaStar,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then(setReviews);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleApproval = async (id) => {
    try {
      const res = await fetch('/api/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success('Review status updated!');
        fetchReviews();
      }
    } catch (error) {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        toast.success('Review deleted!');
        fetchReviews();
      }
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-orbitron font-bold text-white">
          Reviews Management
        </h1>
        <p className="text-gray-500 mt-1">
          Manage customer reviews ({reviews.length} total)
        </p>
      </div>

      <div className="grid gap-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass rounded-2xl p-6 ${
              !review.approved ? 'border border-yellow-500/30' : ''
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-white">{review.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      review.approved
                        ? 'bg-neon-green/10 text-neon-green'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}
                  >
                    {review.approved ? 'Approved' : 'Pending'}
                  </span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      className={`text-sm ${
                        j < review.rating ? 'text-accent' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-400">{review.comment}</p>
                <p className="text-gray-600 text-sm mt-2">{review.date}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleApproval(review.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    review.approved
                      ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                      : 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20'
                  }`}
                  title={review.approved ? 'Hide' : 'Approve'}
                >
                  {review.approved ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-12 glass rounded-2xl">
            <p className="text-gray-500 text-lg">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}