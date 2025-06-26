"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logisticsStatusSchema = new mongoose_1.default.Schema({
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        collection: {
            completed: { type: Boolean, default: false },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
            timestamp: Date,
            location: String,
            notes: String
        },
        transportation: {
            completed: { type: Boolean, default: false },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
            timestamp: Date,
            location: String,
            vehicleId: String,
            estimatedArrival: Date
        },
        storage: {
            completed: { type: Boolean, default: false },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
            timestamp: Date,
            warehouseId: String,
            temperature: Number,
            humidity: Number
        },
        packaging: {
            completed: { type: Boolean, default: false },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
            timestamp: Date,
            packageType: String,
            quantity: Number
        },
        delivery: {
            completed: { type: Boolean, default: false },
            status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
            timestamp: Date,
            location: String,
            trackingId: String,
            estimatedDelivery: Date
        }
    },
    currentStep: {
        type: String,
        enum: ['collection', 'transportation', 'storage', 'packaging', 'delivery'],
        default: 'collection'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('LogisticsStatus', logisticsStatusSchema);
