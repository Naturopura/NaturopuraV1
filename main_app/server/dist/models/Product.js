"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: [
            'cereals_grains',
            'pulses_legumes',
            'oilseeds',
            'fiber_crops',
            'sugar_crops',
            'vegetables',
            'fruits',
            'beverage_crops',
            'cultivated_fungi',
            'aquaculture',
            'farmed_animals',
            'animal_husbandry',
            'other'
        ]
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    farmerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{ type: String }], // Array of image paths
    status: {
        type: String,
        enum: ['available', 'out_of_stock', 'purchased'],
        default: 'available'
    },
    arrival_status: {
        type: String,
        enum: ['pending', 'arrived'],
        default: 'pending'
    },
    arrivalDate: {
        type: Date,
        default: null
    },
    shipping_status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending'
    },
    shippedDate: {
        type: Date,
        default: null
    },
    deliveredDate: {
        type: Date,
        default: null
    },
    vehicle_number: { type: String, default: "" },
    origin: { type: String, default: "" },
    destination: { type: String, default: "" }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Product', productSchema);
