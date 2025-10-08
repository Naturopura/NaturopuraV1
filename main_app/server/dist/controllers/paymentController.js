"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.verifyRazorpayPayment = exports.createRazorpayPayment = exports.getUserPurchases = exports.getPurchaseAddress = exports.getPurchaseDetails = exports.updatePurchaseAddress = exports.processCryptoPurchase = void 0;
const paymentService = __importStar(require("../services/paymentService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const purchaseDao = __importStar(require("../dao/purchaseDao"));
// export const processTestPayment = async (
//   req: Request<{}, {}, PaymentRequest>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const payment = paymentService.handleTestPayment(req.body, req.user?._id);
//     console.log('Test payment:', payment);
//     res.status(statusCode.OK).json({
//       success: true,
//       message: `Test payment ${payment.status} processed`,
//       data: payment
//     });
//   } catch (error) {
//     console.error('Test payment error:', {
//       error: error instanceof Error ? error.message : 'Unknown error',
//       stack: error instanceof Error ? error.stack : undefined,
//       body: req.body
//     });
//     res.status(statusCode.BAD_REQUEST).json({
//       success: false,
//       message: error instanceof Error ? error.message : 'Error processing test payment'
//     });
//   }
// };
const processCryptoPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const purchase = yield paymentService.handleCryptoPurchase(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Purchase processed successfully',
            data: purchase
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error processing purchase'
        });
    }
});
exports.processCryptoPurchase = processCryptoPurchase;
const updatePurchaseAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { purchaseId } = req.params;
        const { shippingAddress } = req.body;
        const purchase = yield purchaseDao.findPurchaseById(purchaseId);
        if (!purchase) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Purchase not found'
            });
            return;
        }
        purchase.shippingAddress = shippingAddress;
        const updatedPurchase = yield purchaseDao.updatePurchase(purchase);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Purchase address updated successfully',
            data: updatedPurchase
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error updating purchase address'
        });
    }
});
exports.updatePurchaseAddress = updatePurchaseAddress;
const getPurchaseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { purchaseId } = req.params;
        // First check if the purchase exists
        const purchase = yield purchaseDao.findPurchaseById(purchaseId);
        if (!purchase) {
            console.log('Purchase not found in database for ID:', purchaseId);
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Purchase not found',
                error: 'No purchase found with the specified ID'
            });
            return;
        }
        // Verify ownership - purchase should belong to the authenticated user
        if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) !== purchase.userId.toString()) {
            console.log('Purchase ID:', purchaseId, 'does not belong to user:', (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            res.status(statusCode_1.default.FORBIDDEN).json({
                success: false,
                message: 'Unauthorized access',
                error: 'Purchase does not belong to this user'
            });
            return;
        }
        // Format the response to match the client's expectations
        const response = {
            data: {
                data: purchase
            }
        };
        res.status(statusCode_1.default.OK).json(response);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error fetching purchase details',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getPurchaseDetails = getPurchaseDetails;
const getPurchaseAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { purchaseId } = req.params;
        const purchase = yield purchaseDao.findPurchaseById(purchaseId);
        if (!purchase) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'Purchase not found'
            });
            return;
        }
        if (!purchase.shippingAddress) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'No address found for this purchase'
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: {
                address: purchase.shippingAddress
            }
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error fetching purchase address'
        });
    }
});
exports.getPurchaseAddress = getPurchaseAddress;
const getUserPurchases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
            res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
            return;
        }
        const purchases = yield purchaseDao.findPurchasesByUserId(req.user._id.toString());
        res.status(200).json({
            success: true,
            data: purchases
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user purchases',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.getUserPurchases = getUserPurchases;
const createRazorpayPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield paymentService.createRazorpayOrder(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Razorpay order created successfully',
            data: result
        });
    }
    catch (error) {
        console.error('Error in createRazorpayPayment controller:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error creating Razorpay order'
        });
    }
});
exports.createRazorpayPayment = createRazorpayPayment;
const verifyRazorpayPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield paymentService.verifyRazorpayPayment(req.body);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Payment verified successfully',
            data: purchase
        });
    }
    catch (error) {
        res.status(statusCode_1.default.BAD_REQUEST).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error verifying payment'
        });
    }
});
exports.verifyRazorpayPayment = verifyRazorpayPayment;
exports.default = {
    // processTestPayment,
    processCryptoPurchase: exports.processCryptoPurchase,
    updatePurchaseAddress: exports.updatePurchaseAddress,
    getPurchaseAddress: exports.getPurchaseAddress,
    getPurchaseDetails: exports.getPurchaseDetails,
    getUserPurchases: exports.getUserPurchases,
    createRazorpayPayment: exports.createRazorpayPayment,
    verifyRazorpayPayment: exports.verifyRazorpayPayment
};
