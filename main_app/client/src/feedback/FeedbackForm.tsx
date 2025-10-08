// src/pages/FeedbackForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp } from 'lucide-react';
import FarmerLayout from '../components/layouts/FarmerLayout';
import FeedbackContractABI from '../constants/FeedbackContract.json';
import { CONTRACT_ADDRESS } from '../constants/feedback_addrs';
import { ethers } from 'ethers';

// Extend Window type for Ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

const feedbackCategories = [
  { id: 'Bug', label: 'Bug' },
  { id: 'Suggestion', label: 'Suggestion' },
  { id: 'General', label: 'General' },
  { id: 'Other', label: 'Other' },
];

const FeedbackForm: React.FC = () => {
  const { user, token } = useAuth();
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    if (error) setError('');
  }, [message, category, rating, title]);

const submitToBlockchain = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, FeedbackContractABI, signer);
    const tx = await contract.submitFeedback(title, message, category, rating);
    await tx.wait();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!category) {
      setError('Please select a feedback category');
      setIsSubmitting(false);
      return;
    }

    if (rating === null) {
      setError('Please provide a rating');
      setIsSubmitting(false);
      return;
    }

    if (!title.trim()) {
      setError('Please provide a title for your feedback.');
      setIsSubmitting(false);
      return;
    }

    if (!message.trim()) {
      setError('Please provide your detailed feedback message.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit to blockchain
      await submitToBlockchain();

      // Submit to backend API
      await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback`,
        {
          message,
          phoneNumber: user?.phoneNumber,
          category,
          rating,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowSuccessAnimation(true);
      setSuccess('Thank you for your feedback! Your input helps us improve.');

      setMessage('');
      setCategory('');
      setRating(null);
      setTitle('');

      setTimeout(() => {
        setSuccess('');
        setShowSuccessAnimation(false);
      }, 5000);

    } catch (err: any) {
      console.error('Submission failed:', err);
      setError(err?.message || 'Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingStars = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl transition-all duration-200 ${
            rating !== null && star <= rating
              ? 'text-yellow-400 scale-110'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
      {rating && (
        <span className="ml-2 text-sm text-gray-600">
          {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating - 1]}
        </span>
      )}
    </div>
  );

  return (
    <FarmerLayout title="Feedback & Support" subtitle="Share your thoughts or get help">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-naturopura-gradient px-6 py-4">
            <h2 className="text-2xl font-bold text-white">We Value Your Feedback</h2>
            <p className="text-emerald-100 mt-1">Help us improve our services by sharing your thoughts and experiences.</p>
          </div>

          {showSuccessAnimation && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 flex items-center">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <ThumbsUp className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-emerald-700">{success}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                placeholder="Summarize your feedback in a few words"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 bg-white"
                required
              >
                <option value="" disabled>Select a category</option>
                {feedbackCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How would you rate your experience?
              </label>
              {renderRatingStars()}
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Feedback
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500"
                placeholder="Please share your thoughts, suggestions, or concerns in detail..."
                rows={6}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Your feedback helps us create a better farming experience for everyone.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-naturopura-gradient text-white py-3 px-6 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Feedback'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information Block (unchanged) */}
        {/* ... keep the rest as-is ... */}
      </div>
    </FarmerLayout>
  );
};

export default FeedbackForm;
