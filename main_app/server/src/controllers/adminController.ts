import { Request, Response } from 'express';
import Purchase from '../models/Purchase';
import Product from '../models/Product';
import User from '../models/User';
import statusCode from '../utils/statusCode';

export const getAdminPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find()
      .populate('productId', 'name category description price unit quantity')
      .populate('userId', 'username email')
      .select('+address');

    res.status(statusCode.OK).json(purchases);
  } catch (error) {
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching purchase history'
    });
  }
};

export const getDeliveryPartners = async (req: Request, res: Response) => {
  try {
    const deliveryPartners = await User.find({ role: 'delivery_partner' }).select('-password');
    res.status(statusCode.OK).json(deliveryPartners);
  } catch (error) {
   
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching delivery partners'
    });
  }
};

export const updateDeliveryPartnerApproval = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Invalid approval status'
      });
      return;
    }

    const deliveryPartner = await User.findByIdAndUpdate(
      id,
      { deliveryPartnerApprovalStatus: approvalStatus },
      { new: true }
    ).select('-password');

    if (!deliveryPartner) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Delivery partner not found'
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      data: deliveryPartner
    });
  } catch (error) {
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating delivery partner approval'
    });
  }
};

export const getFarmers = async (req: Request, res: Response) => {
  try {
    const farmers = await User.find({ role: 'farmer' }).select('-password');
    res.status(statusCode.OK).json({
      success: true,
      data: farmers
    });
  } catch (error) {
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching farmers'
    });
  }
};

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'farmer' });

    const totalLoans = await Purchase.countDocuments();
    const totalLoanAmount = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]).then(result => result[0]?.total || 0);

    const totalProducts = await Product.countDocuments();

    const loanStatusCounts = await Purchase.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]).then(result => {
      const counts = {
        pending: 0,
        approved: 0,
        rejected: 0
      };
      result.forEach(item => {
        if (item._id === 'pending') counts.pending = item.count;
        if (item._id === 'approved') counts.approved = item.count;
        if (item._id === 'rejected') counts.rejected = item.count;
      });
      return counts;
    });

    const stats = {
      totalFarmers,
      totalLoans,
      totalLoanAmount,
      totalProducts,
      pendingLoans: loanStatusCounts.pending,
      approvedLoans: loanStatusCounts.approved,
      rejectedLoans: loanStatusCounts.rejected
    };

    res.status(statusCode.OK).json({
      success: true,
      data: stats
    });
  } catch (error) {
    
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching dashboard stats'
    });
  }
};

export const getDeliveryPartnerPurchases = async (req: Request, res: Response) => {
  try {
    const deliveryPartnerId = req.user?._id;
    if (!deliveryPartnerId) {
      res.status(statusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await User.findById(deliveryPartnerId);
    if (!user || user.role !== 'delivery_partner') {
      res.status(statusCode.FORBIDDEN).json({ success: false, message: 'Access denied' });
      return;
    }

    const purchases = await Purchase.find({ deliveryPartnerId })
      .populate('productId', 'name category description price unit quantity')
      .populate('userId', 'username email')
      .select('+address');

    res.status(statusCode.OK).json(purchases);
  } catch (error) {
   
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching delivery partner purchases'
    });
  }
};

export const getStoreManagers = async (req: Request, res: Response) => {
  try {
    const storeManagers = await User.find({ role: 'store_manager' }).select('-password');
    res.status(statusCode.OK).json(storeManagers);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching store managers'
    });
  }
};

export const updateStoreManagerApproval = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Invalid approval status'
      });
      return;
    }

    const storeManager = await User.findByIdAndUpdate(
      id,
      { storeManagerApprovalStatus: approvalStatus },
      { new: true }
    ).select('-password');

    if (!storeManager) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Store manager not found'
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      data: storeManager
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating store manager approval'
    });
  }
};

// Vendor approval endpoints
export const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await User.find({ role: 'vendor' }).select('-password');
    res.status(statusCode.OK).json(vendors);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching vendors'
    });
  }
};

export const updateVendorApproval = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { approvalStatus } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
      res.status(statusCode.BAD_REQUEST).json({
        success: false,
        message: 'Invalid approval status'
      });
      return;
    }

    const vendor = await User.findByIdAndUpdate(
      id,
      { vendorApprovalStatus: approvalStatus },
      { new: true }
    ).select('-password');

    if (!vendor) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: 'Vendor not found'
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      data: vendor
    });
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error updating vendor approval'
    });
  }
};
