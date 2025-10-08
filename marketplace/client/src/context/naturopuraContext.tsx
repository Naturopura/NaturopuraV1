const naturopuraContext = `
Naturopura is a full-featured agricultural technology platform built to support farmers through modern digital tools, AI, and blockchain. It is multilingual (English, Hindi, Odia) and available via web and mobile apps.

---

🌾 **AI-Powered Crop Health Detection**
- Farmers can upload crop images to detect diseases using AI models.
- After analysis, the platform identifies the disease (if any) and suggests treatment steps.
- Results are available in multiple languages and downloadable as a PDF.
- Helps early detection to minimize crop loss.

---

🌱 **Soil Analysis**
- The platform uses SoilGrids API to analyze properties like pH, clay content, and organic carbon from geolocation-based coordinates.
- Farmers enter latitude and longitude to fetch real-time soil data from 0-5cm depth.
- Key indicators include:
  - **Soil pH**: Used to determine acidic, neutral, or alkaline conditions.
  - **Organic Carbon (%)**: Helps assess fertility.
  - **Clay Content (%)**: Determines water retention and drainage capacity.
- Based on this data, the system recommends suitable crops (e.g., Wheat, Barley, Corn).
- It also provides growing tips, ideal soil conditions, common problems, and solutions for each crop.
- The crop suggestion logic checks:
  - pH between 6.0 and 7.5
  - Organic carbon above 1.0
- Example crops:
  - **Wheat**: Loamy soil, avoid waterlogging, manage rust disease
  - **Barley**: Sandy loam, cool climates, resist powdery mildew
  - **Corn**: Fertile, nitrogen-rich soil, full sun, control corn borers

---

🪪 **Digital Identity (eKYC)**
- Farmers register using secure onboarding.
- Includes document verification (Aadhaar, PAN, etc.).
- After admin approval, a digital profile is created for each farmer.

---

💰 **Financial Services**
- Integrated with MetaMask for crypto payments.
- Farmers can apply for loans based on identity and farm data.
- View transaction history, loan status, and digital receipts.
- **MetaMask Payment Feature Details:**
  - Enables secure cryptocurrency payments using MetaMask wallet.
  - Supports Ethereum and compatible tokens for transactions.
  - Facilitates loan disbursement and repayment via blockchain.
  - Provides transaction confirmation and history within the app.
  - Enhances transparency and security for financial services.

---

🛒 **Marketplace**
- Farmers list their products for sale (crops, grains, seeds, etc.).
- Real-time price suggestions are generated using market data and historical trends.
- Includes order tracking, delivery status, and sales analytics dashboard.

---

☀️ **Weather Forecasting**
- Uses geolocation to show real-time weather for farms.
- Crop-specific forecasts and alerts (e.g., rainfall, temperature drop).
- Weekly planning reports help in irrigation and pesticide timing.

---

📹 **Motion Detection**
- Uses IoT sensors or mobile cameras for farm surveillance.
- Detects motion or object presence with timestamps and confidence scores.
- Sends SMS alerts (via Twilio) to registered farmer contact numbers.

---

🧑‍💼 **Admin Tools**
- Admins verify farmer KYC and approve or reject registrations.
- Admin dashboard to view user feedback, complaints, and suggestions.
- Sort, filter, and export user data and platform activity.

---

💬 **Feedback System**
- Farmers can submit platform feedback, feature requests, or bug reports.
- Categorized by topic (e.g., marketplace, soil, crop health).
- Admins and developers view this data to improve the platform.

---

📊 **Data for Model Training**
- **Crop Disease Dataset**: Thousands of labeled images of crops with various diseases and healthy samples, annotated with disease type and severity.
- **Soil Health Records**: Historical soil data including pH, organic carbon, moisture, and nutrient levels linked with crop yield outcomes.
- **Weather Patterns**: Multi-year weather data including temperature, rainfall, humidity, and their impact on crop health and pest outbreaks.
- **Farmer Profiles**: Anonymized farmer data including location, crop types, farming practices, and financial service usage.
- **Pest and Animal Attack Logs**: Timestamped records of pest and animal attacks detected via IoT sensors and drone monitoring, with classification labels.
- **Market Transactions**: Historical sales data, price fluctuations, and buyer-seller interactions to train pricing and demand prediction models.
- **Drone Imagery**: High-resolution drone images with annotated crop stress areas, pest infestations, and soil conditions.
- **Feedback and Survey Data**: Farmer feedback and survey responses used to improve AI model recommendations and platform usability.

This comprehensive dataset supports continuous training and improvement of AI models for crop health detection, soil analysis, pest prediction, financial risk assessment, and market forecasting.

---

🤖 **AI Chat Interface (AiChatBox)**
- Provides a conversational interface for farmers to interact with the AI assistant.
- Supports text input and image uploads for crop and soil analysis.
- Utilizes the Naturopura platform documentation context to generate informed AI responses.
- Fetches and displays historical AI and user messages with status indicators (sending, delivered, failed).
- Formats AI responses with markdown support including bold, italics, inline code, and code blocks.
- Allows users to copy AI responses to clipboard and clear chat history.
- Integrates with backend AI endpoints for chat and image analysis.
- Enhances user experience with auto-scrolling, typing indicators, and error handling.


This platform supports decentralized, intelligent, and farmer-first agriculture using modern web technologies (React, Node.js, MongoDB, AI, and Blockchain).
`;

export default naturopuraContext;
