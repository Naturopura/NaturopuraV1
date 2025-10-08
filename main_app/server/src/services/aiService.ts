import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();
import { deleteMessagesBySession, deleteMessagesByUser } from '../dao/aiDao';
import generateNaturopuraPrompt from '../ai/generateNaturopuraPrompt'; // import your prompt generator

export const getAiResponse = async (userQuestion: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('Missing Gemini API Key');

  // Generate the prompt including instructions and context
  const prompt = generateNaturopuraPrompt(userQuestion);

  const modelName = 'models/gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    }),
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      const errorText = await response.text();
      console.error(`❌ Gemini API Error (Non-JSON): Status ${response.status}, Text: ${errorText}`);
      throw new Error(`Gemini API call failed with status ${response.status}: ${errorText.substring(0, 200)}...`);
    }
    console.error('❌ Gemini API Error:', errorData);
    throw new Error(errorData.error?.message || `Gemini API call failed with status ${response.status}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return reply || 'No response from Gemini';
};

// Session-specific services
export const clearSessionMessages = async (sessionId: string) => {
  await deleteMessagesBySession(sessionId);
};

export const clearUserMessages = async (userId: string) => {
  await deleteMessagesByUser(userId);
};
