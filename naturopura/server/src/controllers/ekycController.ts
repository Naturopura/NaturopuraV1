import { Request, Response } from 'express';
import * as ekycService from '../services/ekycService';
import statusCode from '../utils/statusCode';

interface DocumentFiles {
  aadhar: Express.Multer.File[];
  pan: Express.Multer.File[];
  selfie: Express.Multer.File[];
}

export const verifyEkyc = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const filesRaw = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!filesRaw.aadhar || !filesRaw.pan || !filesRaw.selfie) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'All required documents must be provided',
      });
      return;
    }

   if (
  !filesRaw.aadhar || !filesRaw.pan || !filesRaw.selfie
) {
  res.status(statusCode.BAD_REQUEST).json({
    success: false,
    message: 'All required documents (aadhar, pan, selfie) must be provided',
  });
  return;
}

const files: DocumentFiles = {
  aadhar: filesRaw.aadhar,
  pan: filesRaw.pan,
  selfie: filesRaw.selfie,
};


    const userId = req.user._id;
    const user = await ekycService.getUserById(userId);
    if (!user) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    if (!user.isPhoneVerified || (user.kyc && !user.kyc.phoneVerified)) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Phone number must be verified before completing eKYC',
        verificationStatus: {
          isPhoneVerified: user.isPhoneVerified,
          kycPhoneVerified: user.kyc?.phoneVerified,
        },
      });
      return;
    }

    const documents = await ekycService.updateEkycDocuments(userId, files);

    res.status(statusCode.OK).json({
      success: true,
      message: 'eKYC verification completed successfully',
      documents,
    });
  } catch (error) {
    console.error('eKYC verification error:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to process eKYC verification',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getEkycStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const kyc = await ekycService.getEkycStatus(req.user._id);

    if (!kyc) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      data: kyc,
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to fetch eKYC status',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const verifyPhone = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(statusCode.UNAUTHORIZED).json({
        success: false,
        message: 'User not authenticated',
      });
      return;
    }

    const user = await ekycService.verifyPhoneNumber(req.user._id);

    if (!user) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    console.log('Phone verification status:', {
      userId: req.user._id,
      isPhoneVerified: user.isPhoneVerified,
      kycPhoneVerified: user.kyc?.phoneVerified,
      verifiedAt: user.phoneVerifiedAt,
    });

    res.status(statusCode.OK).json({
      success: true,
      message: 'Phone number verified successfully',
      data: {
        isPhoneVerified: user.isPhoneVerified,
        kycPhoneVerified: user.kyc?.phoneVerified,
        verifiedAt: user.phoneVerifiedAt,
      },
    });
  } catch (error) {
    console.error('Phone verification error:', error);
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Failed to verify phone number',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
