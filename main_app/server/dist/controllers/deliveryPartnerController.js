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
exports.getAssignedPurchasesController = exports.assignPurchaseController = exports.getAvailablePurchasesController = void 0;
const deliveryPartnerService_1 = require("../services/deliveryPartnerService");
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const purchaseDao = __importStar(require("../dao/purchaseDao"));
// Helper function to handle responses
const sendResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
// Helper function for error handling
const handleError = (res, error) => {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: errorMessage
    });
};
// Helper function to check user ID
const checkUserId = (req) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        throw new Error('User ID is required');
    }
    return userId;
};
const getAvailablePurchasesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = checkUserId(req);
        const { data } = yield (0, deliveryPartnerService_1.getAvailablePurchases)(userId);
        res.status(statusCode_1.default.OK).json(data);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getAvailablePurchasesController = getAvailablePurchasesController;
const assignPurchaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { purchaseId } = req.params;
        const userId = checkUserId(req);
        const { data } = yield (0, deliveryPartnerService_1.assignDeliveryPartner)(purchaseId, userId);
        sendResponse(res, statusCode_1.default.OK, data);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.assignPurchaseController = assignPurchaseController;
const getAssignedPurchasesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = checkUserId(req);
        const purchases = yield purchaseDao.findPurchasesByDeliveryPartnerId(userId);
        sendResponse(res, statusCode_1.default.OK, purchases);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getAssignedPurchasesController = getAssignedPurchasesController;
