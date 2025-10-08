import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { 
  getAvailablePurchasesController, 
  assignPurchaseController,
  getAssignedPurchasesController
} from '../controllers/deliveryPartnerController';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get available purchases for delivery partner to claim
router.get('/available', getAvailablePurchasesController);

// Assign delivery partner to a purchase
router.post('/assign/:purchaseId', assignPurchaseController);

// Get all purchases assigned to this delivery partner
router.get('/assigned', getAssignedPurchasesController);

export default router;
