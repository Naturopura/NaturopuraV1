"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Purchase_1 = __importDefault(require("../models/Purchase"));
// Runs every 5 minutes
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    try {
        const result = yield Purchase_1.default.updateMany({ status: 'pending', createdAt: { $lte: thirtyMinutesAgo } }, { $set: { status: 'completed' } });
        if (result.modifiedCount > 0) {
            console.log(`[AutoConfirm] Marked ${result.modifiedCount} purchases as completed.`);
        }
    }
    catch (err) {
        console.error('[AutoConfirm] Error auto-confirming purchases:', err);
    }
}), 5 * 60 * 1000);
