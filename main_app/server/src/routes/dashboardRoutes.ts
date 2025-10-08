import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authenticate } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router = express.Router();

// Protect all dashboard routes with authentication and admin role check
router.use(authenticate);
router.use(authorizeRoles('admin'));

// Protected routes
router.get('/stats', getDashboardStats);

export default router;