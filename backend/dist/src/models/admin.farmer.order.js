"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    farmer: {
        type: String,
        ref: "Admin",
        required: true,
    },
    firstName: { type: String, required: [true, "Please enter first name"] },
    lastName: {
        type: String,
        required: [true, "Please enter last name"],
    },
    companyName: { type: String },
    email: { type: String, required: [true, "Please enter email"] },
    phone: {
        type: String,
        required: [true, "Please enter mobile number"],
    },
    address: { type: String, required: [true, "Please enter address"] },
    address2: { type: String },
    country: { type: String, required: [true, "Please enter country"] },
    zipCode: { type: String, required: [true, "Please enter zipCode"] },
    city: { type: String, required: [true, "Please enter city"] },
    subtotal: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    orderItems: {
        _id: {
            type: mongoose_1.default.Types.ObjectId,
            ref: "Product",
        },
    },
    createdAt: { type: Date, default: Date.now },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
