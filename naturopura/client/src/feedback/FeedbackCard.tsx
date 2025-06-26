// src/pages/FeedbackForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext
import { ThumbsUp, MessageCircleMore, XCircle } from 'lucide-react'; // Import lucide-react icons
import FarmerLayout from '../components/layouts/FarmerLayout'; // Assuming this component exists

// Define feedback categories
const feedbackCategories = [
  { id: 'Bug', label: 'Bug' },
  { id: 'Suggestion', label: 'Suggestion' },
  { id: 'General', label: 'General' },
  { id: 'Other', label: 'Other' },
];

const FeedbackForm: React.FC = () => {
  const { user, token } = useAuth(); // Get user and token from AuthContext
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // States for Support functionality
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSuccess, setSupportSuccess] = useState('');
  const [supportError, setSupportError] = useState('');
  const [isSendingSupport, setIsSendingSupport] = useState(false);

  // Reset error when form inputs change
  useEffect(() => {
    if (error) setError('');
  }, [message, category, rating, title]);

  // Reset support error when support message changes
  useEffect(() => {
    if (supportError) setSupportError('');
  }, [supportMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Form validation
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback`, // Assuming your feedback API endpoint
        {
          message,
          phoneNumber: user?.phoneNumber, // Pass user's phone number if available
          category,
          rating,
          title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Requires authentication for feedback
          },
        }
      );

      setShowSuccessAnimation(true);
      setSuccess('Thank you for your feedback! Your input helps us improve.');

      // Reset form
      setMessage('');
      setCategory('');
      setRating(null);
      setTitle('');

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess('');
        setShowSuccessAnimation(false);
      }, 5000);

    } catch (err: any) {
      console.error('Feedback submission failed:', err);
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingSupport(true);
    setSupportError('');
    setSupportSuccess('');

    if (!supportMessage.trim()) {
      setSupportError('Please enter your support message.');
      setIsSendingSupport(false);
      return;
    }

    if (!user?.phoneNumber) {
        setSupportError('Your phone number is not available. Please log in or update your profile to use support via WhatsApp.');
        setIsSendingSupport(false);
        return;
    }

    // Format the phone number to remove the '+' if it exists for WhatsApp API
    const formattedPhoneNumber = user.phoneNumber.startsWith('+')
        ? user.phoneNumber.substring(1)
        : user.phoneNumber;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/support`, // This is the new endpoint
        {
          phoneNumber: formattedPhoneNumber, // Use the logged-in user's formatted phone number
          supportMessage,
        }
        // No authorization header needed as per your supportRoutes.ts
      );

      setSupportSuccess('Support request sent successfully! We will get back to you on WhatsApp shortly.');
      setSupportMessage(''); // Clear the support message field
      setTimeout(() => {
        setSupportSuccess('');
        setShowSupportModal(false); // Close modal after success
      }, 5000);

    } catch (err: any) {
      console.error('Support message submission failed:', err);
      setSupportError(err.response?.data?.message || 'Failed to send support message. Please try again.');
    } finally {
      setIsSendingSupport(false);
    }
  };

  // Render stars for rating
  const renderRatingStars = () => {
    return (
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
            {rating === 1 ? 'Poor' :
             rating === 2 ? 'Fair' :
             rating === 3 ? 'Good' :
             rating === 4 ? 'Very Good' : 'Excellent'}
          </span>
        )}
      </div>
    );
  };

  return (
    <FarmerLayout title="Feedback & Support" subtitle="Share your thoughts or get help">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">We Value Your Feedback</h2>
            <p className="text-emerald-100 mt-1">
              Help us improve our services by sharing your thoughts and experiences.
            </p>
          </div>

          {/* Success Message for Feedback */}
          {showSuccessAnimation && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 flex items-center animate-fade-in-down">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <ThumbsUp className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="text-emerald-700">{success}</p>
            </div>
          )}

          {/* Error Message for Feedback */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Feedback Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* Feedback Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="Summarize your feedback in a few words"
                required // HTML5 required, backed by JS validation
              />
            </div>

            {/* Feedback Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white transition-all duration-200"
                required // HTML5 required, backed by JS validation
              >
                <option value="" disabled>Select a category</option>
                {feedbackCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How would you rate your experience?
              </label>
              {renderRatingStars()}
            </div>

            {/* Feedback Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Feedback
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                placeholder="Please share your thoughts, suggestions, or concerns in detail..."
                rows={6}
                required // HTML5 required, backed by JS validation
              />
              <p className="mt-1 text-xs text-gray-500">
                Your feedback helps us create a better farming experience for everyone.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-emerald-600 text-white py-3 px-6 rounded-md hover:bg-emerald-700
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                  transition-all duration-200 transform hover:scale-105
                  flex items-center
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Support Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-5 shadow-sm border border-blue-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-1">Need Immediate Help?</h3>
            <p className="text-blue-700">
              For urgent issues or direct assistance, contact our support team via WhatsApp.
            </p>
          </div>
          <button
            onClick={() => setShowSupportModal(true)}
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                       transition-all duration-200 transform hover:scale-105 flex items-center"
          >
            <MessageCircleMore className="w-5 h-5 mr-2" />
            Contact Support
          </button>
        </div>

        {/* Support Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-in">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center rounded-t-lg">
                <h3 className="text-xl font-bold text-white">Contact Support</h3>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="text-white hover:text-blue-200 transition-colors"
                  aria-label="Close support modal"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {supportSuccess && (
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 mb-4 flex items-center animate-fade-in-down">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3">
                    <ThumbsUp className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-emerald-700">{supportSuccess}</p>
                </div>
              )}

              {supportError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                  <p className="text-red-700">{supportError}</p>
                </div>
              )}

              <form onSubmit={handleSupportSubmit} className="p-6">
                <div className="mb-4">
                  <label htmlFor="supportMessage" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message for Support
                  </label>
                  <textarea
                    id="supportMessage"
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Describe your issue or question here..."
                    rows={5}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowSupportModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingSupport}
                    className={`
                      bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      transition-all duration-200 flex items-center
                      ${isSendingSupport ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {isSendingSupport ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Support Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Additional Information for Feedback (existing) */}
        <div className="mt-8 bg-emerald-50 rounded-lg p-5 shadow-sm border border-emerald-100">
          <h3 className="text-lg font-medium text-emerald-800 mb-2">
            Why Your Feedback Matters
          </h3>
          <p className="text-emerald-700 mb-3">
            As a community-focused platform, we rely on insights from farmers like you to grow and improve.
            Your feedback directly influences our development priorities and helps us serve you better.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                <span className="text-emerald-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-medium text-emerald-800">Improving Features</h4>
                <p className="text-sm text-emerald-700">We use your feedback to enhance existing features and develop new ones.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                <span className="text-emerald-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-medium text-emerald-800">Better Support</h4>
                <p className="text-sm text-emerald-700">Your insights help us identify areas where farmers need more assistance.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                <span className="text-emerald-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-medium text-emerald-800">Community Building</h4>
                <p className="text-sm text-emerald-700">Your suggestions help us create a stronger farming community.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                <span className="text-emerald-600 text-sm font-bold">4</span>
              (

              </div>
              <div>
                <h4 className="font-medium text-emerald-800">Resource Development</h4>
                <p className="text-sm text-emerald-700">We create new resources based on the needs you express.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default FeedbackForm;