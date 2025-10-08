// services/ekycService.ts
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = 'https://production.deepvue.tech/v1/ekyc/aadhaar';

const headers = {
  'x-api-key': process.env.DEEPVUE_CLIENT_SECRET || '', // You may want to replace this with actual API key if dynamic
  'client-id': process.env.DEEPVUE_CLIENT_ID || '',
  'Content-Type': 'application/json',
};

// Aadhaar initialization (connect)
export const verifyAadhaar = async (aadhaarNumber: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/connect`, {
      params: {
        consent: 'Y',
        purpose: 'For KYC',
        aadhaar_number: aadhaarNumber,
      },
      headers,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'Deepvue Aadhaar verification failed'
    );
  }
};

// Generate OTP
export const generateOtp = async (
  aadhaarNumber: string,
  captcha: string,
  sessionId: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/generate-otp`,
      {},
      {
        params: {
          aadhaar_number: aadhaarNumber,
          captcha,
          session_id: sessionId,
          consent: 'Y',
          purpose: 'For KYC',
        },
        headers,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'OTP generation failed'
    );
  }
};

// Verify OTP
export const verifyOtp = async (
  otp: string,
  sessionId: string,
  mobileNumber: string = '9827780783' // Static unless dynamic needed
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/verify-otp`,
      {},
      {
        params: {
          otp,
          session_id: sessionId,
          consent: 'Y',
          purpose: 'For KYC',
          mobile_number: mobileNumber,
        },
        headers,
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || 'OTP verification failed'
    );
  }
};
