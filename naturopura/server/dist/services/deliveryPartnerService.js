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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailablePurchases = exports.assignDeliveryPartner = void 0;
const mongoose_1 = require("mongoose");
const purchaseDao = __importStar(require("../dao/purchaseDao"));
const userDao = __importStar(require("../dao/userDao"));
const assignDeliveryPartner = (purchaseId, deliveryPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchase = yield purchaseDao.findPurchaseById(purchaseId);
        if (!purchase) {
            throw new Error('Purchase not found');
        }
        const deliveryPartner = yield userDao.findUserById(deliveryPartnerId);
        if (!deliveryPartner || deliveryPartner.role !== 'delivery_partner') {
            throw new Error('Invalid delivery partner');
        }
        // Update the purchase with delivery partner ID
        purchase.deliveryPartnerId = new mongoose_1.Types.ObjectId(deliveryPartnerId);
        yield purchaseDao.updatePurchase(purchase);
        return {
            success: true,
            message: 'Delivery partner assigned successfully',
            data: purchase
        };
    }
    catch (error) {
        console.error('Error assigning delivery partner:', error);
        throw error;
    }
});
exports.assignDeliveryPartner = assignDeliveryPartner;
const getAvailablePurchases = (deliveryPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveryPartner = yield userDao.findUserById(deliveryPartnerId);
        if (!deliveryPartner || deliveryPartner.role !== 'delivery_partner') {
            throw new Error('Invalid delivery partner');
        }
        // Get all purchases
        const purchases = yield purchaseDao.findPurchases();
        return {
            success: true,
            data: purchases
        };
    }
    catch (error) {
        console.error('Error getting available purchases:', error);
        throw error;
    }
});
exports.getAvailablePurchases = getAvailablePurchases;
