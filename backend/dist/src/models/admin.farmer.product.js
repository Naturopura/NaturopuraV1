"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    farmerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    name: { type: String, required: [true, "Please enter Name"] },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please enter category"],
    },
    price: { type: Number, required: [true, "Please enter price"] },
    currency: { type: String, required: true, enum: ["INR", "USD"] },
    unit: {
        type: String,
        required: [true, "Please select a unit"],
        enum: [
            "g", // gram
            "kg", // kilogram
            "ml", // milliliter
            "L", // liter
        ],
    },
    quantity: { type: Number, required: [true, "Please enter quantity"] },
    description: { type: String },
    image: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Create Product Model
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
