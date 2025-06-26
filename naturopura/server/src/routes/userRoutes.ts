import express, { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser, getShippingAddress, updateShippingAddress, getUserAddresses, addAddress, updateAddress, deleteAddress } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { checkDeliveryPartnerApproval } from '../middleware/deliveryPartnerApproval';
import { getDeliveryPartnerPurchases, getFarmers } from '../controllers/adminController';
import { JwtPayloadUser } from '../types/auth.types';
import { verifyToken } from '../controllers/authController';
import { isAdmin } from '../middleware/roleCheck';

interface AuthenticatedRequest extends Request {
  user: JwtPayloadUser;
}

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validate', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyToken(req as AuthenticatedRequest, res);
  } catch (error) {
    next(error);
  }
});
router.get('/farmers', authenticateToken, isAdmin, getFarmers);
router.get('/phone-verification-status', authenticateToken, (req, res, next) => { res.status(200).json({ success: true, verified: true }); next(); });
router.put('/profile', authenticateToken, (req, res, next) => { res.status(200).json({ success: true, message: 'Profile updated' }); next(); });

router.get('/shipping-address', authenticateToken, getShippingAddress);
router.put('/shipping-address', authenticateToken, updateShippingAddress);

// Address management routes
router.get('/addresses', authenticateToken, getUserAddresses);
router.post('/addresses', authenticateToken, addAddress);
router.put('/addresses/:addressId', authenticateToken, updateAddress);
router.delete('/addresses/:addressId', authenticateToken, deleteAddress);

// Delivery partner routes example
router.get('/delivery/details', authenticateToken, checkDeliveryPartnerApproval, (req, res) => {
  // Placeholder for delivery partner delivery details handler
  res.json({ success: true, message: 'Delivery partner delivery details endpoint' });
});

// Delivery partner purchases route
router.get('/delivery-partner/purchases', authenticateToken, checkDeliveryPartnerApproval, getDeliveryPartnerPurchases);

export default router;
