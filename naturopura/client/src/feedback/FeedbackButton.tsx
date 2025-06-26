import { MdChat } from 'react-icons/md';
import posthog from 'posthog-js';

const FeedbackButton = () => {
  const handleFeedbackClick = () => {
    // Use capture instead of startSurvey
    posthog.capture('feedback_button_clicked', {
      $survey_id: 'your-survey-id' // Replace with your actual survey ID
    });
  };

  return (
    <button
      onClick={handleFeedbackClick}
      className="fixed bottom-4 right-4 bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors duration-200"
      aria-label="Feedback"
    >
      <MdChat size={24} />
    </button>
  );
};

export default FeedbackButton;
