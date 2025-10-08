"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AiMessageSchema = new mongoose_1.default.Schema({
    sender: { type: String, enum: ['user', 'ai'], required: true },
    text: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'AiSession', required: true },
}, { timestamps: true });
// Index for efficient querying
AiMessageSchema.index({ sessionId: 1, createdAt: 1 });
AiMessageSchema.index({ userId: 1, sessionId: 1 });
exports.AiMessage = mongoose_1.default.model('AiMessage', AiMessageSchema);
