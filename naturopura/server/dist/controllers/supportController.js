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
exports.sendSupportMessage = void 0;
const axios_1 = require("axios");
const supportService_1 = require("../services/supportService");
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const sendSupportMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { phoneNumber, supportMessage } = req.body;
        yield (0, supportService_1.handleSupportMessage)(phoneNumber, supportMessage);
        res.status(statusCode_1.default.OK).json({
            message: 'Support request sent via WhatsApp',
        });
    }
    catch (error) {
        console.error('Support message error:', error);
        if (error instanceof axios_1.AxiosError && ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data)) {
            res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to send support message via WhatsApp API',
                details: error.response.data,
            });
        }
        else if (error instanceof Error && error.message.includes('required')) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: error.message });
        }
        else {
            res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to send support message',
                error: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
});
exports.sendSupportMessage = sendSupportMessage;
