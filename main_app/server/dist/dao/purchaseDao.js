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
exports.findPurchasesByUserId = exports.findUserPurchaseById = exports.createPurchase = exports.findPurchasesByDeliveryPartnerId = exports.findPurchases = exports.updatePurchase = exports.findPurchaseById = void 0;
const Purchase_1 = __importDefault(require("../models/Purchase"));
const findPurchaseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Purchase_1.default.findById(id)
        .populate('productId', 'name category description price unit quantity')
        .populate('userId', 'username email');
});
exports.findPurchaseById = findPurchaseById;
const updatePurchase = (purchase) => __awaiter(void 0, void 0, void 0, function* () {
    return yield purchase.save();
});
exports.updatePurchase = updatePurchase;
const findPurchases = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Purchase_1.default.find()
        .populate('productId', 'name category description price unit quantity')
        .populate('userId', 'username email')
        .select('+address');
});
exports.findPurchases = findPurchases;
const findPurchasesByDeliveryPartnerId = (deliveryPartnerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Purchase_1.default.find({ deliveryPartnerId })
        .populate('productId', 'name category description price unit quantity')
        .populate('userId', 'username email')
        .select('+address');
});
exports.findPurchasesByDeliveryPartnerId = findPurchasesByDeliveryPartnerId;
const createPurchase = (purchaseData, options) => __awaiter(void 0, void 0, void 0, function* () {
    const purchase = new Purchase_1.default(purchaseData);
    return yield purchase.save(options);
});
exports.createPurchase = createPurchase;
const findUserPurchaseById = (userId, purchaseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Purchase_1.default.findOne({ _id: purchaseId, userId })
        .populate('productId', 'name category description price unit quantity')
        .populate('userId', 'username email')
        .select('shippingAddress');
});
exports.findUserPurchaseById = findUserPurchaseById;
const findPurchasesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Purchase_1.default.find({ userId })
        .populate('productId', 'name category description price unit quantity')
        .populate('userId', 'name email')
        .select('shippingAddress createdAt amount paymentMethod status');
});
exports.findPurchasesByUserId = findPurchasesByUserId;
