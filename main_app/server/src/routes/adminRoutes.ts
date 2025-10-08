import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { isAdmin } from '../middleware/roleCheck';
import { getAdminPurchases, getDeliveryPartners, updateDeliveryPartnerApproval, getDashboardStats, getStoreManagers, updateStoreManagerApproval } from '../controllers/adminController';

const router = express.Router();

// Admin routes
router.get('/purchases', [authenticateToken, isAdmin], getAdminPurchases);
router.get('/dashboard-stats', [authenticateToken, isAdmin], getDashboardStats);

// Delivery partner management routes
router.get('/delivery-partners', [authenticateToken, isAdmin], getDeliveryPartners);
router.put('/delivery-partners/:id/approval', [authenticateToken, isAdmin], updateDeliveryPartnerApproval);

// Store manager management routes
router.get('/store-managers', [authenticateToken, isAdmin], getStoreManagers);
router.put('/store-managers/:id/approval', [authenticateToken, isAdmin], updateStoreManagerApproval);

export default router;
