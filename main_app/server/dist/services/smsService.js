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
exports.sendBulkSMSMessages = exports.sendSingleSMS = void 0;
// services/smsService.ts
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    process.exit(1);
}
const twilioClient = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const formatPhoneNumber = (number) => {
    // Remove all non-digit characters except +
    const cleanNumber = number.replace(/[^0-9+]/g, "");
    // If it already starts with +, return as is (already formatted)
    if (cleanNumber.startsWith("+")) {
        return cleanNumber;
    }
    // Remove + if present and get only digits
    const digitsOnly = cleanNumber.replace(/[^0-9]/g, "");
    // Check if it's already a full international number starting with 91
    if (digitsOnly.startsWith("91") && digitsOnly.length === 12) {
        return `+${digitsOnly}`;
    }
    // If it's a 10-digit Indian number, add +91
    if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
        return `+91${digitsOnly}`;
    }
    // If it's 11 digits starting with 0, remove the 0 and add +91
    if (digitsOnly.length === 11 && digitsOnly.startsWith("0")) {
        return `+91${digitsOnly.substring(1)}`;
    }
    // Default case: assume it's a 10-digit number and add +91
    return `+91${digitsOnly}`;
};
const sendSingleSMS = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formattedNumber = formatPhoneNumber(to);
        const smsResponse = yield twilioClient.messages.create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: formattedNumber,
        });
        console.log(`SMS sent successfully! SID: ${smsResponse.sid}`);
        console.log(`Message status: ${smsResponse.status}`);
        console.log(`Full Twilio response:`, JSON.stringify(smsResponse, null, 2));
        return {
            to: formattedNumber,
            sid: smsResponse.sid,
            success: true,
        };
    }
    catch (error) {
        console.error('SMS sending failed:', error);
        console.error('Error details:', {
            code: error.code,
            message: error.message,
            status: error.status,
            moreInfo: error.moreInfo
        });
        throw error;
    }
});
exports.sendSingleSMS = sendSingleSMS;
const sendBulkSMSMessages = (recipients, message) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    const failed = [];
    for (const recipient of recipients) {
        try {
            const result = yield (0, exports.sendSingleSMS)(recipient, message);
            results.push(result);
        }
        catch (error) {
            failed.push({
                to: recipient,
                error: error instanceof Error ? error.message : "Unknown error",
                success: false,
            });
        }
    }
    return { results, failed };
});
exports.sendBulkSMSMessages = sendBulkSMSMessages;
