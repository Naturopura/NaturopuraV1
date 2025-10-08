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
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const cartService_1 = require("../services/cartService");
const mongoose_1 = require("mongoose");
const cartService = new cartService_1.CartServiceImpl();
const getCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = new mongoose_1.Types.ObjectId(user._id);
        const cart = yield cartService.getCart(userId);
        if (!cart) {
            void res.status(200).json({ success: true, cart: [] });
            return;
        }
        void res.status(200).json({ success: true, cart: cart.items });
    }
    catch (error) {
        next(error);
    }
});
exports.getCart = getCart;
const addToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const user = req.user;
        if (!productId || !quantity) {
            void res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
            return;
        }
        const userId = new mongoose_1.Types.ObjectId(user._id);
        const cart = yield cartService.addToCart(userId, productId, quantity);
        void res.status(200).json({ success: true, cart: cart.items });
    }
    catch (error) {
        next(error);
    }
});
exports.addToCart = addToCart;
const updateCartItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, quantity } = req.body;
        const user = req.user;
        if (!productId || !quantity) {
            void res.status(400).json({ success: false, message: 'Product ID and quantity are required' });
            return;
        }
        const userId = new mongoose_1.Types.ObjectId(user._id);
        yield cartService.updateCartItem(userId, productId, quantity);
        void res.status(200).json({ success: true, message: 'Cart item updated' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCartItem = updateCartItem;
const removeFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.body;
        const user = req.user;
        const userId = new mongoose_1.Types.ObjectId(user._id);
        yield cartService.removeFromCart(userId, productId);
        void res.status(200).json({ success: true, message: 'Item removed from cart' });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFromCart = removeFromCart;
const clearCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const userId = new mongoose_1.Types.ObjectId(user._id);
        yield cartService.clearCart(userId);
        void res.status(200).json({ success: true, message: 'Cart cleared' });
    }
    catch (error) {
        next(error);
    }
});
exports.clearCart = clearCart;
