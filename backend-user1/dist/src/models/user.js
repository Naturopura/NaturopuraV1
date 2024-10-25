"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator_1.default.default.isEmail,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    walletAddress: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // timestamps will automatically create 'createdAt' and 'updatedAt' fields.
const User = mongoose_1.default.models.User || mongoose_1.default.model("User", userSchema);
exports.default = User;
