"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const storeSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    contact: {
        phone: String,
        email: String
    },
    managerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' }],
    vehicles: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Vehicle' }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Store', storeSchema);
