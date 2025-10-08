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
exports.verifyOtpService = exports.sendOtpService = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
const userDao = __importStar(require("../dao/userDao"));
dotenv_1.default.config();
const otpStore = new Map();
const twilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const sendOtpService = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const message = yield twilioClient.messages.create({
        body: `Your verification code is: ${otp}`,
        to: `+91${phoneNumber}`,
        from: process.env.TWILIO_PHONE_NUMBER
    });
    otpStore.set(phoneNumber, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
        attempts: 0
    });
});
exports.sendOtpService = sendOtpService;
const verifyOtpService = (phoneNumber, otp, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = otpStore.get(phoneNumber);
    if (!record) {
        throw new Error('No OTP found for this number');
    }
    if (Date.now() > record.expiresAt) {
        otpStore.delete(phoneNumber);
        throw new Error('OTP expired');
    }
    if (record.otp !== otp) {
        record.attempts++;
        if (record.attempts >= 5) {
            otpStore.delete(phoneNumber);
            throw new Error('Too many invalid attempts. Please request a new OTP.');
        }
        otpStore.set(phoneNumber, record);
        throw new Error('Invalid OTP');
    }
    // OTP is valid, update user phone verification
    const updatedUser = yield userDao.updateUserById(userId, {
        isPhoneVerified: true,
        phoneVerifiedAt: new Date(),
        phoneNumber: phoneNumber,
        'kyc.phoneVerified': true
    });
    if (!updatedUser) {
        throw new Error('User not found');
    }
    otpStore.delete(phoneNumber);
    return {
        isPhoneVerified: true,
        phoneVerifiedAt: new Date(),
        phoneNumber: phoneNumber
    };
});
exports.verifyOtpService = verifyOtpService;
