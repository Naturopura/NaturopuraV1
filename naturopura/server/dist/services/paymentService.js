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
exports.handleCryptoPurchase = exports.handleTestPayment = void 0;
const ethers_1 = require("ethers");
const mongoose_1 = __importDefault(require("mongoose"));
const productDao = __importStar(require("../dao/productDao"));
const purchaseDao = __importStar(require("../dao/purchaseDao"));
const handleTestPayment = (req, userId) => {
    const { amount, productId, status } = req;
    if (!amount || !productId) {
        throw new Error('Amount and productId are required');
    }
    return {
        amount,
        productId,
        userId,
        status,
        createdAt: new Date()
    };
};
exports.handleTestPayment = handleTestPayment;
const handleCryptoPurchase = (req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, amount, txHash, shippingAddress } = req;
    if (!productId || !amount || !txHash || !shippingAddress) {
        throw new Error('Missing required fields');
    }
    let transaction = null;
    try {
        // Validate environment variables
        if (!process.env.SEPOLIA_RPC_URL) {
            throw new Error('SEPOLIA_RPC_URL environment variable is not set');
        }
        if (!process.env.CONTRACT_ADDRESS) {
            throw new Error('CONTRACT_ADDRESS environment variable is not set');
        }
        const provider = new ethers_1.ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        console.log('Verifying transaction:', txHash);
        // First try to get the transaction receipt
        const receipt = yield provider.getTransactionReceipt(txHash);
        if (!receipt) {
            throw new Error(`Transaction receipt not found for txHash: ${txHash}`);
        }
        // Check if transaction was successful
        if (receipt.status !== 1) {
            throw new Error(`Transaction failed on blockchain. Status: ${receipt.status}`);
        }
        // Verify the transaction matches our expected parameters
        transaction = yield provider.getTransaction(txHash);
        if (!transaction) {
            throw new Error(`Transaction not found for txHash: ${txHash}`);
        }
        // Get product and verify price
        const product = yield productDao.findProductById(productId);
        if (!product) {
            throw new Error(`Product not found with ID: ${productId}`);
        }
        // Check if product is available
        if (product.status !== 'available') {
            throw new Error(`Product is not available for purchase. Current status: ${product.status}`);
        }
        // Verify transaction amount matches product price
        const expectedValue = ethers_1.ethers.parseEther(product.price.toString());
        if (transaction.value !== expectedValue) {
            throw new Error(`Transaction value mismatch. Expected: ${expectedValue.toString()}, Actual: ${transaction.value.toString()}`);
        }
        // Start transaction
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // No longer update product status on purchase to allow multiple purchases
            // Create purchase record
            const purchase = yield purchaseDao.createPurchase({
                productId,
                userId,
                deliveryPartnerId: undefined, // TODO: Assign delivery partner ID here if applicable
                address: shippingAddress.street,
                pincode: shippingAddress.pincode,
                txHash,
                amount: Number(product.price),
                paymentMethod: 'crypto',
                status: 'completed',
                shippingAddress
            }, { session });
            yield session.commitTransaction();
            return purchase;
        }
        catch (error) {
            yield session.abortTransaction();
            throw error;
        }
    }
    catch (error) {
        console.error('Transaction verification failed:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            txHash,
            userId,
            amount,
            transaction: transaction ? {
                to: transaction.to,
                value: transaction.value.toString()
            } : null
        });
        throw error;
    }
});
exports.handleCryptoPurchase = handleCryptoPurchase;
