import express from 'express';
import { createFeedback,getAllFeedbacks } from '../controllers/feedbackController';
import { authenticate } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/', authenticate,createFeedback);
router.get('/', authenticate, isAdmin, getAllFeedbacks);

export default router;
