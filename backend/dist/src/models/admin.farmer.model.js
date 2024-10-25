"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    name: { type: String, required: [true, "Please enter Name"] },
    category: { type: String, required: [true, "Please enter category"] },
    price: { type: Number, required: [true, "Please enter price"] },
    quantity: { type: Number, required: [true, "Please enter quantity"] },
    description: { type: String },
    image: { type: Buffer, required: true },
    createdAt: { type: Date, default: Date.now }
});
// Create Product Model
const Product = mongoose.model('Product', productSchema);
exports.default = Product;
