import { Router } from 'express';
import { sendOtp, verifyOtp } from '../controllers/otpController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/send-otp', authenticateToken, sendOtp);
router.post('/verify-otp', authenticateToken, verifyOtp);

export default router;
