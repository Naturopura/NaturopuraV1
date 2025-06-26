import { Request, Response } from 'express';
import * as otpService from '../services/otpService';
import statusCode from '../utils/statusCode';

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Phone number is required'
      });
      return;
    }

    await otpService.sendOtpService(phoneNumber);

    res.status(statusCode.OK).json({
      success: true,
      message: 'OTP sent successfully'
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to send OTP',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, otp } = req.body;
    const userId = req.user?._id;

    if (!phoneNumber || !otp || !userId) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Phone number, OTP and user authentication are required'
      });
      return;
    }

    const verificationResult = await otpService.verifyOtpService(phoneNumber, otp, userId);

    res.status(statusCode.OK).json({
      success: true,
      message: 'Phone number verified successfully',
      data: verificationResult
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
