import express from 'express';
import { verifyEkyc, getEkycStatus } from '../controllers/ekycController';
import { authenticateToken } from '../middleware/auth';
import { handleEkycUpload } from '../middleware/upload';

const router = express.Router();

// Verify eKYC route
router.post(
  '/verify',
  authenticateToken,
  handleEkycUpload,
  verifyEkyc
);

// Get eKYC status route
router.get(
  '/status', 
  authenticateToken, 
  getEkycStatus
);

export default router;