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
    console.error("❌ Missing required Twilio configuration.");
    process.exit(1);
}
const twilioClient = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const formatPhoneNumber = (number) => {
    return number.startsWith("+") ? number : `+91${number.replace(/[^0-9]/g, "")}`;
};
const sendSingleSMS = (to, message) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedNumber = formatPhoneNumber(to);
    const smsResponse = yield twilioClient.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to: formattedNumber,
    });
    return {
        to: formattedNumber,
        sid: smsResponse.sid,
        success: true,
    };
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
