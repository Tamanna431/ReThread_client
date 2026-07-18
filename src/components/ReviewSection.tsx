'use client';

import { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';

interface Review {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  itemId: string;
}

export default function ReviewSection({ reviews, averageRating, totalReviews, itemId }: ReviewSectionProps) {
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // API call will be added later
    setTimeout(() => {
      setIsSubmitting(false);
      setNewReview({ rating: 5, comment: '' });
    }, 1000);
  };

  const renderStars = (rating: number, size = 'w-5 h-5') => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h2 className="font-heading text-2xl font-bold text-forest mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        Reviews & Ratings
      </h2>

      {/* Rating Summary */}
      <div className="bg-oat rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-forest">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mt-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-sm text-gray-600 mt-2">{totalReviews} reviews</p>
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="border-t border-gray-200 pt-6 mb-8">
        <h3 className="font-semibold text-lg text-forest mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition ${
                      star <= newReview.rating
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
              placeholder="Share your experience with this item..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-forest hover:bg-forest-light text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-forest">{review.user.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {renderStars(review.rating, 'w-4 h-4')}
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mt-3">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}