import * as userDao from '../dao/userDao';
import path from 'path';

interface DocumentFiles {
  aadhar: Express.Multer.File[];
  pan: Express.Multer.File[];
  selfie: Express.Multer.File[];
}

export const getUserById = async (userId: string) => {
  return await userDao.findUserById(userId);
};

export const updateEkycDocuments = async (userId: string, files: DocumentFiles) => {
  const documents = {
    aadhar: path.relative(path.join(__dirname, '../../'), files.aadhar[0].path),
    pan: path.relative(path.join(__dirname, '../../'), files.pan[0].path),
    selfie: path.relative(path.join(__dirname, '../../'), files.selfie[0].path),
  };

  await userDao.updateUserById(userId, {
    kyc: {
      status: 'verified',
      documents,
      verifiedAt: new Date(),
    }
  });

  return documents;
};

export const getEkycStatus = async (userId: string) => {
  const user = await userDao.findUserById(userId);
  return user?.kyc;
};

export const verifyPhoneNumber = async (userId: string) => {
  const user = await userDao.updateUserById(
    userId,
    {
      isPhoneVerified: true,
      phoneVerifiedAt: new Date(),
      kyc: { phoneVerified: true },
    }
  );
  return user;
};
