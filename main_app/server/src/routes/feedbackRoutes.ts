import express from 'express';
import { createFeedback,getAllFeedbacks } from '../controllers/feedbackController';
import { authenticateToken } from '../middleware/auth';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/', authenticateToken,createFeedback);
router.get('/', authenticateToken, isAdmin, getAllFeedbacks);

export default router;
