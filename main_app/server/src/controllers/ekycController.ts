// controllers/ekycController.ts
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import User from '../models/User';
import {
  verifyAadhaar,
  generateOtp,
  verifyOtp,
} from '../services/ekycService';

// Step 1: Aadhaar Connect
export const aadhaarVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { aadhaarNumber } = req.body;

  if (!aadhaarNumber) {
    res.status(400).json({ message: "Aadhaar number is required" });
    return;
  }

  try {
    const data = await verifyAadhaar(aadhaarNumber);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error?.response?.data || error.message,
    });
  }
};

// Step 2: Generate OTP
export const aadhaarGenerateOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { aadhaarNumber, captcha, sessionId } = req.body;

  if (!aadhaarNumber || !captcha || !sessionId) {
    res.status(400).json({ message: 'aadhaarNumber, captcha, and sessionId are required' });
    return;
  }

  try {
    const data = await generateOtp(aadhaarNumber, captcha, sessionId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error?.response?.data || error.message,
    });
  }
};

// ✅ Step 3: Verify OTP and Update KYC
export const aadhaarVerifyOtp = async (
  req: Request,
  res: Response
): Promise<void> => {

const userId = (req as AuthenticatedRequest).user?._id;
  const { otp, sessionId } = req.body;
  if (!otp || !sessionId || !userId) {
    res
      .status(400)
      .json({ message: "otp, sessionId, and _id (user ID) are required" });
    return;
  }

  try {
    const data = await verifyOtp(otp, sessionId);

    // ✅ Update user KYC status in the DB
    await User.findByIdAndUpdate(userId, {
      $set: {
        'kyc.status': 'verified',
        'kyc.aadhaarDetails.otpVerified': true,
        'kyc.aadhaarDetails.verifiedAt': new Date(),
      },
    });

    res.status(200).json({
      message: 'OTP verified and KYC status updated',
      data,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error?.response?.data || error.message,
    });
  }
};
