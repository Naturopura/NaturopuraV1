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
exports.verifyOtp = exports.generateOtp = exports.verifyAadhaar = void 0;
// services/ekycService.ts
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const BASE_URL = 'https://production.deepvue.tech/v1/ekyc/aadhaar';
const headers = {
    'x-api-key': process.env.DEEPVUE_CLIENT_SECRET || '', // You may want to replace this with actual API key if dynamic
    'client-id': process.env.DEEPVUE_CLIENT_ID || '',
    'Content-Type': 'application/json',
};
// Aadhaar initialization (connect)
const verifyAadhaar = (aadhaarNumber) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios_1.default.get(`${BASE_URL}/connect`, {
            params: {
                consent: 'Y',
                purpose: 'For KYC',
                aadhaar_number: aadhaarNumber,
            },
            headers,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Deepvue Aadhaar verification failed');
    }
});
exports.verifyAadhaar = verifyAadhaar;
// Generate OTP
const generateOtp = (aadhaarNumber, captcha, sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios_1.default.post(`${BASE_URL}/generate-otp`, {}, {
            params: {
                aadhaar_number: aadhaarNumber,
                captcha,
                session_id: sessionId,
                consent: 'Y',
                purpose: 'For KYC',
            },
            headers,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'OTP generation failed');
    }
});
exports.generateOtp = generateOtp;
// Verify OTP
const verifyOtp = (otp_1, sessionId_1, ...args_1) => __awaiter(void 0, [otp_1, sessionId_1, ...args_1], void 0, function* (otp, sessionId, mobileNumber = '9827780783' // Static unless dynamic needed
) {
    var _a, _b;
    try {
        const response = yield axios_1.default.post(`${BASE_URL}/verify-otp`, {}, {
            params: {
                otp,
                session_id: sessionId,
                consent: 'Y',
                purpose: 'For KYC',
                mobile_number: mobileNumber,
            },
            headers,
        });
        return response.data;
    }
    catch (error) {
        throw new Error(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'OTP verification failed');
    }
});
exports.verifyOtp = verifyOtp;
