# Naturopura - Agricultural Technology Platform

## Overview

**Naturopura** is a comprehensive agricultural technology platform designed to empower farmers and administrators with digital solutions. The platform leverages blockchain, AI, real-time weather and soil analysis, financial services, feedback systems, and market price analytics to deliver a modern farming experience.

---

## Features

### 🌾 For Farmers

- **Digital Identity (eKYC):**
  - Secure onboarding and Aadhaar-based verification
  - Profile management

- **Financial Services:**
  - Crypto payments (MetaMask integration)
  - Loan applications and digital payments
  - Transaction history

- **Marketplace:**
  - Real-time price suggestions
  - Product listing and order tracking
  - Sales analytics

- **Crop Health Detection:**
  - AI-powered crop analysis and disease identification
  - Multi-language support (English, Hindi, Odia)
  - Treatment recommendations
  - Downloadable PDF reports

- **Soil Analysis:**
  - Upload soil test images or data
  - AI-powered fertility and nutrient analysis
  - Crop suggestions based on soil condition
  - Soil health report generation

- **Weather Updates:**
  - Real-time weather data via geolocation
  - Crop-specific weather alerts
  - Weekly forecasts

- **Pricing Info:**
  - Live commodity price tracking
  - State/district-based price lookup
  - Predictive pricing trends
  - Compare MSP vs market prices

- **Feedback System:**
  - In-app feedback submission
  - PostHog survey integration
  - Rating and category-based feedback

- **Motion Detection:**
  - Real-time motion event monitoring
  - SMS notifications
  - Object detection and event history

---

### 🛠️ For Administrators

- **User Management:**
  - Farmer verification and KYC approval
  - Account management

- **Feedback Management:**
  - View, filter, and analyze user feedback
  - Export feedback data

---

## AI Service Integration

- Backend service (`aiService.ts`) interfaces with Gemini Generative Language API
- Provides AI-generated responses for crop health, soil analysis, and more
- Handles prompt-based AI content generation with error handling and API key management

**Example Usage:**

```ts
import { getAiResponse } from './services/aiService';

const systemInstruction = "You are an AI assistant knowledgeable about the Naturopura agricultural technology platform, which includes features like AI-powered crop health detection, soil analysis, weather updates, and financial services for farmers.";

async function generateAiContent(userQuery: string) {
  const prompt = `${systemInstruction}\nUser: ${userQuery}`;
  try {
    const response = await getAiResponse(prompt);
    console.log('AI Response:', response);
    // Use the AI response as needed in your application
  } catch (error) {
    console.error('Error calling AI service:', error);
  }
}
```

Set the `GEMINI_API_KEY` environment variable with your Gemini API key before running the application.

---

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- TailwindCSS
- PostHog Integration
- SMS Integration (Twilio)

### Backend

- Node.js + Express
- MongoDB
- TypeScript
- JWT Authentication
- Google Vision API
- Twilio SMS API
- Weather & Soil Analysis APIs
- Gemini Generative Language API

---

## Integrations

### PostHog Initialization

```ts
posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
  api_host: 'https://app.posthog.com',
  autocapture: true,
  session_recording: { enabled: true },
  surveys: { enabled: true }
});
```

### Feedback System Interface

```ts
interface FeedbackType {
  userId: string;
  message: string;
  rating?: number;
  category: 'Bug' | 'Suggestion' | 'General' | 'Other';
  phoneNumber?: string;
}
```

### SMS Notifications

```ts
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
```

---

## Environment Variables

```plaintext
# PostHog
VITE_POSTHOG_API_KEY=your_posthog_key

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number

# Google Vision API
GOOGLE_VISION_API_KEY=your_vision_api_key

# Weather API
WEATHER_API_KEY=your_weather_api_key

# Soil Analysis API
SOIL_API_KEY=your_soil_api_key

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
```

---

## API Documentation

### Feedback Endpoint

```
POST /api/feedback/create
```

**Request Body:**

```json
{
  "message": "Feedback message",
  "rating": 5,
  "category": "Bug",
  "phoneNumber": "+1234567890"
}
```

### Motion Detection Endpoint

```
POST /api/motion
```

**Request Body:**

```json
{
  "timestamp": "2025-05-25T10:00:00.000Z",
  "photo": "base64_encoded_image"
}
```

### Weather Endpoint

```
GET /api/weather?lat=20.5&lon=85.8
```

### Soil Analysis Endpoint

```
POST /api/soil/analyze
```

**Request Body:**

```json
{
  "image": "base64_encoded_soil_image"
}
```

---

## Project Structure

```
naturopura/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── feedback/
│   │   │   │   └── FeedbackButton.tsx
│   │   │   └── sensor/
│   │   │       └── MotionEvent.tsx
│   │   ├── features/
│   │   │   ├── soil/
│   │   │   ├── weather/
│   │   │   └── pricing/
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   └── services/
│   │       ├── notificationService.ts
│   │       └── weatherService.ts
└── server/
    ├── src/
    │   ├── controllers/
    │   │   ├── feedbackController.ts
    │   │   ├── smsController.ts
    │   │   ├── motionEventController.ts
    │   │   ├── soilAnalysisController.ts
    │   │   └── weatherController.ts
    │   └── models/
    │       ├── Feedback.ts
    │       └── MotionEvent.ts
```

---

## Setting Up PostHog Surveys

1. Create a survey in the PostHog dashboard
2. Configure targeting and questions
3. Get the survey ID
4. Trigger the survey from frontend

---

## Getting Started

1. Clone the repository
2. Install dependencies (`npm install` in both `client` and `server`)
3. Set up environment variables as shown above
4. Run the backend (`npm run dev` in `server`)
5. Run the frontend (`npm run dev` in `client`)
6. Access the app in your browser

---

## License

This project is licensed under the MIT License.

---

If you need more details or want to document additional features, let me know!


