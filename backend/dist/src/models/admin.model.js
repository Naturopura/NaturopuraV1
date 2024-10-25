"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            "admin",
            "consumer",
            "farmer",
            "distributors",
            "consultant",
            "agricultural_chemicals",
            "equipment_manufacturers",
            "marketing_agencies",
            "insurance",
            "cold-storage",
        ],
        default: "consumer",
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    signature: {
        type: String,
        required: true,
    },
    nonce: {
        type: Number,
        unique: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
    isRemember: {
        type: Boolean,
        default: false,
    },
    dialingCode: {
        type: String,
        required: true,
    },
    addressLine: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // timestamps will automatically create 'createdAt' and 'updatedAt' fields.
const Admin = mongoose_1.default.models.Admin || mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
