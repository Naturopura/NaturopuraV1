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
exports.verifyToken = void 0;
const authService_1 = require("../services/authService");
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = (0, authService_1.verifyUser)(req.user);
        if (result.success) {
            return res.status(result.statusCode).json({
                success: true,
                user: result.user
            });
        }
        else {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }
    }
    catch (error) {
        console.error('Token verification error:', error);
        return res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error'
        });
    }
});
exports.verifyToken = verifyToken;
