import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export const checkDeliveryPartnerApproval = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user?.role === 'delivery_partner') {
    try {
      const User = require('../models/User').default;
      const user = await User.findById(req.user._id).select('deliveryPartnerApprovalStatus');
      if (!user || user.deliveryPartnerApprovalStatus !== 'approved') {
        res.status(403).json({
          success: false,
          message: 'Access denied: Delivery partner not approved'
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error checking delivery partner approval'
      });
      return;
    }
  }
  next();
};
