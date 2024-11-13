"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    name: { type: String, required: [true, "Please enter Name"] },
    category: {
        type: String,
        required: [true, "Please enter category"],
        enum: [
            "vegetables",
            "fruits",
            "staples",
            "chips",
            "bakery",
            "snacks",
            "chocolates",
            "biscuits",
            "tea",
            "coffee",
            "juices",
            "honey",
        ],
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
const Product = mongoose.model("Product", productSchema);
exports.default = Product;
