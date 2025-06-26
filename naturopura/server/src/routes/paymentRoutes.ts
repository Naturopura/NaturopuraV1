import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { processTestPayment, processCryptoPurchase, updatePurchaseAddress, getPurchaseAddress, getPurchaseDetails } from '../controllers/paymentController';

const router = express.Router();

// Test payment route
router.post('/test-payment', authenticateToken, processTestPayment);

// Crypto purchase route
router.post('/purchase', authenticateToken, processCryptoPurchase);

// Update purchase address route
router.put('/purchase/:purchaseId/address', authenticateToken, updatePurchaseAddress);
router.get('/purchase/:purchaseId/address', authenticateToken, getPurchaseAddress);
router.get('/purchase/:purchaseId', authenticateToken, getPurchaseDetails);

export default router;
