import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import { registerUser,loginUser,getUserAddresses, addAddress, updateAddress, deleteAddress, getUserProfile, updateUserProfile,getShippingAddress,updateShippingAddress, 
  googleOAuthCallback,forgotPassword,resetPasswordController } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { checkDeliveryPartnerApproval } from '../middleware/deliveryPartnerApproval';
import { getDeliveryPartnerPurchases, getFarmers, getVendors, updateVendorApproval, updateStoreManagerApproval, updateDeliveryPartnerApproval } from '../controllers/adminController';
import { verifyToken } from '../controllers/authController';
import { isAdmin } from '../middleware/roleCheck';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validate', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyToken(req as any, res);
  } catch (error) {
    next(error);
  }
});
router.get('/farmers', authenticateToken, isAdmin, getFarmers);
router.get('/vendors', authenticateToken, isAdmin, getVendors);
router.put('/vendors/:id/status', authenticateToken, isAdmin, updateVendorApproval);
router.put('/store-managers/:id/status', authenticateToken, isAdmin, updateStoreManagerApproval);
router.put('/delivery-partners/:id/status', authenticateToken, isAdmin, updateDeliveryPartnerApproval);
router.get('/phone-verification-status', authenticateToken, (req, res, next) => { res.status(200).json({ success: true, verified: true }); next(); });

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleOAuthCallback
);

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile/:id', authenticateToken, updateUserProfile);

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

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPasswordController);

export default router;
