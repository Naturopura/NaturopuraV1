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
exports.getPurchaseAddress = exports.getPurchaseDetails = exports.updatePurchaseAddress = exports.processCryptoPurchase = exports.processTestPayment = void 0;
const paymentService = __importStar(require("../services/paymentService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const purchaseDao = __importStar(require("../dao/purchaseDao"));
const processTestPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payment = paymentService.handleTestPayment(req.body, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        console.log('Test payment:', payment);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: `Test payment ${payment.status} processed`,
            data: payment
        });
    }
    catch (error) {
        console.error('Test payment error:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            body: req.body
        });
        res.status(statusCode_1.default.BAD_REQUEST).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error processing test payment'
        });
    }
});
exports.processTestPayment = processTestPayment;
const processCryptoPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        console.log('Received payment request:', {
            body: req.body,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
        });
        const purchase = yield paymentService.handleCryptoPurchase(req.body, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
        console.log('Processing purchase:', {
            purchase,
            user: req.user
        });
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Purchase processed successfully',
            data: purchase
        });
    }
    catch (error) {
        console.error('Purchase processing error:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            body: req.body,
            userId: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id
        });
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
        purchase.address = shippingAddress.street;
        purchase.pincode = Number(shippingAddress.pincode);
        const updatedPurchase = yield purchaseDao.updatePurchase(purchase);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Purchase address updated successfully',
            data: updatedPurchase
        });
    }
    catch (error) {
        console.error('Error updating purchase address:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            body: req.body,
            params: req.params
        });
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error updating purchase address'
        });
    }
});
exports.updatePurchaseAddress = updatePurchaseAddress;
const getPurchaseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        console.log('Request headers:', req.headers);
        console.log('Request params:', req.params);
        console.log('Request user:', req.user);
        const { purchaseId } = req.params;
        console.log('Fetching purchase details:', {
            purchaseId,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            isAuthenticated: !!req.user
        });
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
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b._id) !== purchase.userId.toString()) {
            console.log('Purchase ID:', purchaseId, 'does not belong to user:', (_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
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
        console.error('Error fetching purchase details:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            purchaseId: req.params.purchaseId,
            userId: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id
        });
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
        console.error('Error fetching purchase address:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error fetching purchase address'
        });
    }
});
exports.getPurchaseAddress = getPurchaseAddress;
exports.default = {
    processTestPayment: exports.processTestPayment,
    processCryptoPurchase: exports.processCryptoPurchase,
    updatePurchaseAddress: exports.updatePurchaseAddress,
    getPurchaseAddress: exports.getPurchaseAddress,
    getPurchaseDetails: exports.getPurchaseDetails
};
