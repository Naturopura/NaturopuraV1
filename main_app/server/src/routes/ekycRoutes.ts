// routes/ekycRoutes.ts
import express from 'express';
import {
  aadhaarVerification,
  aadhaarGenerateOtp,
  aadhaarVerifyOtp,
} from '../controllers/ekycController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/connect', aadhaarVerification);
router.post('/generate-otp', aadhaarGenerateOtp);
router.post('/verify-otp',authenticateToken, aadhaarVerifyOtp);

export default router;
