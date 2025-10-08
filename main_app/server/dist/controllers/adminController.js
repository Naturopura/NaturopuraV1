"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorApproval = exports.getVendors = exports.updateStoreManagerApproval = exports.getStoreManagers = exports.getDeliveryPartnerPurchases = exports.getDashboardStats = exports.getFarmers = exports.updateDeliveryPartnerApproval = exports.getDeliveryPartners = exports.getAdminPurchases = void 0;
const Purchase_1 = __importDefault(require("../models/Purchase"));
const Product_1 = __importDefault(require("../models/Product"));
const User_1 = __importDefault(require("../models/User"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const getAdminPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield Purchase_1.default.find()
            .populate('productId', 'name category description price unit quantity')
            .populate('userId', 'username email')
            .select('+address');
        res.status(statusCode_1.default.OK).json(purchases);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching purchase history'
        });
    }
});
exports.getAdminPurchases = getAdminPurchases;
const getDeliveryPartners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryPartners = yield User_1.default.find({ role: 'delivery_partner' }).select('-password');
        res.status(statusCode_1.default.OK).json(deliveryPartners);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching delivery partners'
        });
    }
});
exports.getDeliveryPartners = getDeliveryPartners;
const updateDeliveryPartnerApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { approvalStatus } = req.body;
        if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid approval status'
            });
            return;
        }
        const deliveryPartner = yield User_1.default.findByIdAndUpdate(id, { deliveryPartnerApprovalStatus: approvalStatus }, { new: true }).select('-password');
        if (!deliveryPartner) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Delivery partner not found'
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: deliveryPartner
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error updating delivery partner approval'
        });
    }
});
exports.updateDeliveryPartnerApproval = updateDeliveryPartnerApproval;
const getFarmers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmers = yield User_1.default.find({ role: 'farmer' }).select('-password');
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: farmers
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching farmers'
        });
    }
});
exports.getFarmers = getFarmers;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalFarmers = yield User_1.default.countDocuments({ role: 'farmer' });
        const totalLoans = yield Purchase_1.default.countDocuments();
        const totalLoanAmount = yield Purchase_1.default.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]).then(result => { var _a; return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) || 0; });
        const totalProducts = yield Product_1.default.countDocuments();
        const loanStatusCounts = yield Purchase_1.default.aggregate([
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
                if (item._id === 'pending')
                    counts.pending = item.count;
                if (item._id === 'approved')
                    counts.approved = item.count;
                if (item._id === 'rejected')
                    counts.rejected = item.count;
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
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: stats
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching dashboard stats'
        });
    }
});
exports.getDashboardStats = getDashboardStats;
const getDeliveryPartnerPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deliveryPartnerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!deliveryPartnerId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const user = yield User_1.default.findById(deliveryPartnerId);
        if (!user || user.role !== 'delivery_partner') {
            res.status(statusCode_1.default.FORBIDDEN).json({ success: false, message: 'Access denied' });
            return;
        }
        const purchases = yield Purchase_1.default.find({ deliveryPartnerId })
            .populate('productId', 'name category description price unit quantity')
            .populate('userId', 'username email')
            .select('+address');
        res.status(statusCode_1.default.OK).json(purchases);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching delivery partner purchases'
        });
    }
});
exports.getDeliveryPartnerPurchases = getDeliveryPartnerPurchases;
const getStoreManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeManagers = yield User_1.default.find({ role: 'store_manager' }).select('-password');
        res.status(statusCode_1.default.OK).json(storeManagers);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching store managers'
        });
    }
});
exports.getStoreManagers = getStoreManagers;
const updateStoreManagerApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { approvalStatus } = req.body;
        if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid approval status'
            });
            return;
        }
        const storeManager = yield User_1.default.findByIdAndUpdate(id, { storeManagerApprovalStatus: approvalStatus }, { new: true }).select('-password');
        if (!storeManager) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Store manager not found'
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: storeManager
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error updating store manager approval'
        });
    }
});
exports.updateStoreManagerApproval = updateStoreManagerApproval;
// Vendor approval endpoints
const getVendors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendors = yield User_1.default.find({ role: 'vendor' }).select('-password');
        res.status(statusCode_1.default.OK).json(vendors);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching vendors'
        });
    }
});
exports.getVendors = getVendors;
const updateVendorApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { approvalStatus } = req.body;
        if (!['pending', 'approved', 'rejected'].includes(approvalStatus)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Invalid approval status'
            });
            return;
        }
        const vendor = yield User_1.default.findByIdAndUpdate(id, { vendorApprovalStatus: approvalStatus }, { new: true }).select('-password');
        if (!vendor) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Vendor not found'
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: vendor
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error updating vendor approval'
        });
    }
});
exports.updateVendorApproval = updateVendorApproval;
