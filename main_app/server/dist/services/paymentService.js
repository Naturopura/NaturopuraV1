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
exports.verifyRazorpayPayment = exports.createRazorpayOrder = exports.handleCryptoPurchase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const productDao = __importStar(require("../dao/productDao")); // Assuming these paths are correct
const purchaseDao = __importStar(require("../dao/purchaseDao")); // Assuming these paths are correct
const crypto = __importStar(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
// Load environment variables from .env file
// In a real application, dotenv.config() should ideally be called once at the application's entry point (e.g., server.ts or app.ts)
// to ensure environment variables are loaded before any module tries to access them.
dotenv_1.default.config();
let razorpay;
/**
 * Lazily initializes and returns a Razorpay instance.
 * Ensures that the Razorpay instance is created only once.
 * Throws an error if Razorpay API keys are not found in environment variables.
 * @returns {Razorpay} The initialized Razorpay instance.
 */
const getRazorpay = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay API keys (RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET) are not set in environment variables.');
    }
    if (!razorpay) {
        razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }
    return razorpay;
};
/**
 * Handles a cryptocurrency purchase, creating a purchase record in the database.
 * This function assumes the blockchain transaction has already been confirmed externally.
 * @param {CryptoPaymentRequest & { shippingAddress?: { name: string; phone: string; street: string; city: string; state: string; pincode: string; }; }} req - The crypto payment request details.
 * @param {string | undefined} userId - The ID of the user making the purchase.
 * @returns {Promise<any>} The created purchase record.
 * @throws {Error} If required fields are missing, product is not found, or product is not available.
 */
const handleCryptoPurchase = (req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, amount, txHash, shippingAddress } = req;
    // Validate required fields for crypto purchase
    if (!productId || !amount || !txHash || !userId || !shippingAddress) {
        throw new Error('Missing required fields for crypto purchase: productId, amount, txHash, userId, shippingAddress.');
    }
    try {
        const product = yield productDao.findProductById(productId);
        if (!product)
            throw new Error(`Product not found with ID: ${productId}`);
        if (product.status !== 'available') {
            throw new Error(`Product is not available. Status: ${product.status}`);
        }
        // Start a Mongoose session for transaction management
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Create the purchase record
            const purchase = yield purchaseDao.createPurchase({
                productId,
                productName: product.name,
                userId,
                deliveryPartnerId: undefined, // No delivery partner assigned initially
                txHash, // Store the blockchain transaction hash
                amount: Number(product.price), // Assuming amount refers to product price
                paymentMethod: 'crypto',
                status: 'completed', // Mark as completed since crypto transaction is assumed confirmed
                shippingAddress: {
                    name: shippingAddress.name,
                    phoneNumber: shippingAddress.phone, // Ensure this matches your schema if different
                    street: shippingAddress.street,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    pincode: shippingAddress.pincode
                },
                pincode: shippingAddress.pincode // Duplicate, but keeping for consistency with original
            }, { session } // Pass the session to the DAO operation
            );
            yield session.commitTransaction(); // Commit the transaction if all operations succeed
            return purchase;
        }
        catch (error) {
            yield session.abortTransaction(); // Abort the transaction on error
            throw error; // Re-throw the error for upstream handling
        }
    }
    catch (error) {
        // Catch any errors from product lookup or transaction failures
        throw error;
    }
});
exports.handleCryptoPurchase = handleCryptoPurchase;
/**
 * Creates a Razorpay order and a corresponding pending purchase record.
 * @param {PaymentRequest & { shippingAddress: { name: string; phone: string; street: string; city: string; state: string; pincode: string; }; }} req - The payment request details including shipping address.
 * @param {string | undefined} userId - The ID of the user making the purchase.
 * @returns {Promise<{ order: any; purchaseId: string }>} The Razorpay order details and the created purchase ID.
 * @throws {Error} If required fields are missing, product is not found, product is not available, or Razorpay order creation fails.
 */
const createRazorpayOrder = (req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, productId, shippingAddress } = req;
    // Validate required fields
    if (!amount || !productId || !userId || !shippingAddress) {
        throw new Error('Missing required fields for Razorpay order creation: amount, productId, userId, shippingAddress.');
    }
    try {
        const product = yield productDao.findProductById(productId);
        if (!product)
            throw new Error(`Product not found with ID: ${productId}`);
        if (product.status !== 'available') {
            throw new Error(`Product is not available. Status: ${product.status}`);
        }
        // Get Razorpay instance and create the order
        const razorpayInstance = getRazorpay();
        // Razorpay amount is in smallest currency unit (e.g., paisa for INR)
        const amountInPaisa = Math.round(Number(product.price) * 100); // Use product.price, not req.amount if req.amount is total
        // If req.amount is already the total, use it directly.
        // Assuming req.amount is the total amount for the order.
        // If `amount` in `PaymentRequest` is the total, use `amount * 100`.
        // If it's product price, then `product.price * quantity * 100`.
        // For now, I'll use `amount * 100` as per your original intent.
        let order;
        try {
            order = yield razorpayInstance.orders.create({
                amount: amountInPaisa,
                currency: 'INR',
                receipt: `order_${Date.now()}`, // Unique receipt ID
                payment_capture: true // Automatically capture payment after successful authorization
            });
        }
        catch (error) {
            console.error('Error creating Razorpay order:', error);
            throw error;
        }
        // Start a Mongoose session for transaction management
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Create a pending purchase record
            const purchase = yield purchaseDao.createPurchase({
                productId,
                productName: product.name,
                userId,
                deliveryPartnerId: undefined, // No delivery partner assigned initially
                amount: Number(product.price), // Store product price in purchase, or total amount
                paymentMethod: 'razorpay',
                status: 'pending', // Status is 'pending' until payment is verified
                shippingAddress: {
                    name: shippingAddress.name,
                    phoneNumber: shippingAddress.phone, // Ensure this matches your schema if different
                    street: shippingAddress.street,
                    city: shippingAddress.city,
                    state: shippingAddress.state,
                    pincode: shippingAddress.pincode
                },
                // pincode: shippingAddress.pincode, // This field is redundant if shippingAddress is an object
                razorpayOrderId: order.id // Store Razorpay order ID for verification
            }, { session } // Pass the session to the DAO operation
            );
            yield session.commitTransaction(); // Commit the transaction if all operations succeed
            return {
                order,
                purchaseId: purchase._id // Return the created purchase ID
            };
        }
        catch (error) {
            yield session.abortTransaction(); // Abort the transaction on error
            throw error; // Re-throw the error for upstream handling
        }
    }
    catch (error) {
        // Catch any errors from product lookup or Razorpay order creation
        throw error;
    }
});
exports.createRazorpayOrder = createRazorpayOrder;
/**
 * Verifies a Razorpay payment signature and updates the corresponding purchase record.
 * @param {{ razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string; purchaseId: string; }} req - The verification request details.
 * @returns {Promise<any>} The updated purchase record.
 * @throws {Error} If the payment signature is invalid, purchase is not found, or purchase is already processed.
 */
const verifyRazorpayPayment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, purchaseId } = req;
    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !purchaseId) {
        throw new Error('Missing required fields for Razorpay payment verification.');
    }
    // Verify the signature using Razorpay's method
    // Ensure RAZORPAY_KEY_SECRET is available
    if (!process.env.RAZORPAY_KEY_SECRET) {
        throw new Error('Razorpay API secret (RAZORPAY_KEY_SECRET) is not set in environment variables.');
    }
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex');
    if (generatedSignature !== razorpaySignature) {
        throw new Error('Invalid payment signature');
    }
    const purchase = yield purchaseDao.findPurchaseById(purchaseId);
    if (!purchase) {
        throw new Error(`Purchase not found with ID: ${purchaseId}`);
    }
    if (purchase.status !== 'pending') {
        throw new Error(`Purchase with ID: ${purchaseId} is already processed or has an invalid status (${purchase.status}).`);
    }
    // Ensure the Razorpay Order ID matches
    if (purchase.razorpayOrderId !== razorpayOrderId) {
        throw new Error('Razorpay Order ID mismatch for purchase.');
    }
    // Update purchase record within a transaction
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        purchase.status = 'completed'; // Mark purchase as completed
        purchase.razorpayPaymentId = razorpayPaymentId;
        // purchase.razorpayOrderId is already set, but can be re-confirmed
        // purchase.razorpayOrderId = razorpayOrderId;
        yield purchaseDao.updatePurchase(purchase); // Pass the session
        yield session.commitTransaction(); // Commit the transaction
        return purchase;
    }
    catch (error) {
        yield session.abortTransaction(); // Abort on error
        throw error; // Re-throw for upstream handling
    }
});
exports.verifyRazorpayPayment = verifyRazorpayPayment;
