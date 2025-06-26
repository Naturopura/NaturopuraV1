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
exports.sendBulkSMS = exports.sendSMS = void 0;
const express_validator_1 = require("express-validator");
const smsService_1 = require("../services/smsService");
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const sendSMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(statusCode_1.default.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    const { to, message } = req.body;
    try {
        const result = yield (0, smsService_1.sendSingleSMS)(to, message);
        res.status(statusCode_1.default.OK).json(Object.assign({ message: "SMS sent successfully" }, result));
    }
    catch (error) {
        console.error("❌ SMS sending error:", error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to send SMS",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.sendSMS = sendSMS;
const sendBulkSMS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(statusCode_1.default.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    const { recipients, message } = req.body;
    if (!Array.isArray(recipients) || recipients.length === 0) {
        res.status(statusCode_1.default.BAD_REQUEST).json({
            success: false,
            message: "Recipients must be a non-empty array",
        });
        return;
    }
    try {
        const { results, failed } = yield (0, smsService_1.sendBulkSMSMessages)(recipients, message);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: `Bulk SMS sent to ${results.length} users, ${failed.length} failed`,
            results,
            errors: failed,
        });
    }
    catch (error) {
        console.error("❌ Bulk SMS sending error:", error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to send bulk SMS",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.sendBulkSMS = sendBulkSMS;
