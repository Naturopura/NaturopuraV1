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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCartItems = exports.removeItemFromCart = exports.updateCartItemQuantity = exports.addItemToCart = exports.createCart = exports.findCartByUserId = void 0;
const Cart_1 = require("../models/Cart");
const findCartByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cart_1.Cart.findOne({ userId }).exec();
});
exports.findCartByUserId = findCartByUserId;
const createCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = new Cart_1.Cart({ userId, items: [] });
    return yield cart.save();
});
exports.createCart = createCart;
const addItemToCart = (userId, productId, quantity, productData) => __awaiter(void 0, void 0, void 0, function* () {
    let cart = yield Cart_1.Cart.findOne({ userId }).exec();
    if (!cart) {
        cart = yield (0, exports.createCart)(userId);
    }
    if (!cart) {
        throw new Error('Cart creation failed');
    }
    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
        existingItem.quantity += quantity;
    }
    else {
        cart.items.push({
            productId,
            quantity,
            product: productData
        });
    }
    return yield cart.save();
});
exports.addItemToCart = addItemToCart;
const updateCartItemQuantity = (userId, productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findOne({ userId }).exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }
    if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
    }
    else {
        cart.items[itemIndex].quantity = quantity;
    }
    return yield cart.save();
});
exports.updateCartItemQuantity = updateCartItemQuantity;
const removeItemFromCart = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findOne({ userId }).exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex === -1) {
        throw new Error('Item not found in cart');
    }
    cart.items.splice(itemIndex, 1);
    return yield cart.save();
});
exports.removeItemFromCart = removeItemFromCart;
const clearCartItems = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield Cart_1.Cart.findOne({ userId }).exec();
    if (!cart) {
        throw new Error('Cart not found');
    }
    cart.items = [];
    return yield cart.save();
});
exports.clearCartItems = clearCartItems;
