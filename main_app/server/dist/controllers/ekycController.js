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
exports.aadhaarVerifyOtp = exports.aadhaarGenerateOtp = exports.aadhaarVerification = void 0;
const User_1 = __importDefault(require("../models/User"));
const ekycService_1 = require("../services/ekycService");
// Step 1: Aadhaar Connect
const aadhaarVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { aadhaarNumber } = req.body;
    if (!aadhaarNumber) {
        res.status(400).json({ message: "Aadhaar number is required" });
        return;
    }
    try {
        const data = yield (0, ekycService_1.verifyAadhaar)(aadhaarNumber);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            error: ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message,
        });
    }
});
exports.aadhaarVerification = aadhaarVerification;
// Step 2: Generate OTP
const aadhaarGenerateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { aadhaarNumber, captcha, sessionId } = req.body;
    if (!aadhaarNumber || !captcha || !sessionId) {
        res.status(400).json({ message: 'aadhaarNumber, captcha, and sessionId are required' });
        return;
    }
    try {
        const data = yield (0, ekycService_1.generateOtp)(aadhaarNumber, captcha, sessionId);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            error: ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message,
        });
    }
});
exports.aadhaarGenerateOtp = aadhaarGenerateOtp;
// ✅ Step 3: Verify OTP and Update KYC
const aadhaarVerifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const { otp, sessionId } = req.body;
    if (!otp || !sessionId || !userId) {
        res
            .status(400)
            .json({ message: "otp, sessionId, and _id (user ID) are required" });
        return;
    }
    try {
        const data = yield (0, ekycService_1.verifyOtp)(otp, sessionId);
        // ✅ Update user KYC status in the DB
        yield User_1.default.findByIdAndUpdate(userId, {
            $set: {
                'kyc.status': 'verified',
                'kyc.aadhaarDetails.otpVerified': true,
                'kyc.aadhaarDetails.verifiedAt': new Date(),
            },
        });
        res.status(200).json({
            message: 'OTP verified and KYC status updated',
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            error: ((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message,
        });
    }
});
exports.aadhaarVerifyOtp = aadhaarVerifyOtp;
