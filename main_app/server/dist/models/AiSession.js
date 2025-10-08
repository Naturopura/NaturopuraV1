"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiSession = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AiSessionSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessageAt: { type: Date },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
// Index for efficient querying
AiSessionSchema.index({ userId: 1, createdAt: -1 });
AiSessionSchema.index({ userId: 1, isActive: 1 });
exports.AiSession = mongoose_1.default.model('AiSession', AiSessionSchema);
