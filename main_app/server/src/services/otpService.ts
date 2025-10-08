import Twilio from 'twilio';
import dotenv from 'dotenv';
import * as userDao from '../dao/userDao';

dotenv.config();

const otpStore = new Map<string, { otp: string; expiresAt: number; attempts: number }>();


const twilioClient = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export const sendOtpService = async (phoneNumber: string): Promise<void> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const message = await twilioClient.messages.create({
    body: `Your verification code is: ${otp}`,
    to: `+91${phoneNumber}`,
    from: process.env.TWILIO_PHONE_NUMBER!
  });

  otpStore.set(phoneNumber, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
    attempts: 0
  });

};

export const verifyOtpService = async (
  phoneNumber: string,
  otp: string,
  userId: string
) => {
  const record = otpStore.get(phoneNumber);

  if (!record) {
    throw new Error('No OTP found for this number');
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(phoneNumber);
    throw new Error('OTP expired');
  }

  if (record.otp !== otp) {
    record.attempts++;
    if (record.attempts >= 5) {
      otpStore.delete(phoneNumber);
      throw new Error('Too many invalid attempts. Please request a new OTP.');
    }
    otpStore.set(phoneNumber, record);
    throw new Error('Invalid OTP');
  }

  // OTP is valid, update user phone verification
  const updatedUser = await userDao.updateUserById(
    userId,
    {
      isPhoneVerified: true,
      phoneVerifiedAt: new Date(),
      phoneNumber: phoneNumber,
      'kyc.phoneVerified': true
    } as any
  );

  if (!updatedUser) {
    throw new Error('User not found');
  }

  otpStore.delete(phoneNumber);

  return {
    isPhoneVerified: true,
    phoneVerifiedAt: new Date(),
    phoneNumber: phoneNumber
  };
};
