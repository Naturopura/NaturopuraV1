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
exports.verifyPhone = exports.getEkycStatus = exports.verifyEkyc = void 0;
const ekycService = __importStar(require("../services/ekycService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const verifyEkyc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }
        const filesRaw = req.files;
        if (!filesRaw.aadhar || !filesRaw.pan || !filesRaw.selfie) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'All required documents must be provided',
            });
            return;
        }
        if (!filesRaw.aadhar || !filesRaw.pan || !filesRaw.selfie) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'All required documents (aadhar, pan, selfie) must be provided',
            });
            return;
        }
        const files = {
            aadhar: filesRaw.aadhar,
            pan: filesRaw.pan,
            selfie: filesRaw.selfie,
        };
        const userId = req.user._id;
        const user = yield ekycService.getUserById(userId);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        if (!user.isPhoneVerified || (user.kyc && !user.kyc.phoneVerified)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Phone number must be verified before completing eKYC',
                verificationStatus: {
                    isPhoneVerified: user.isPhoneVerified,
                    kycPhoneVerified: (_a = user.kyc) === null || _a === void 0 ? void 0 : _a.phoneVerified,
                },
            });
            return;
        }
        const documents = yield ekycService.updateEkycDocuments(userId, files);
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'eKYC verification completed successfully',
            documents,
        });
    }
    catch (error) {
        console.error('eKYC verification error:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to process eKYC verification',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.verifyEkyc = verifyEkyc;
const getEkycStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }
        const kyc = yield ekycService.getEkycStatus(req.user._id);
        if (!kyc) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: kyc,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to fetch eKYC status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getEkycStatus = getEkycStatus;
const verifyPhone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'User not authenticated',
            });
            return;
        }
        const user = yield ekycService.verifyPhoneNumber(req.user._id);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: 'User not found',
            });
            return;
        }
        console.log('Phone verification status:', {
            userId: req.user._id,
            isPhoneVerified: user.isPhoneVerified,
            kycPhoneVerified: (_a = user.kyc) === null || _a === void 0 ? void 0 : _a.phoneVerified,
            verifiedAt: user.phoneVerifiedAt,
        });
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: 'Phone number verified successfully',
            data: {
                isPhoneVerified: user.isPhoneVerified,
                kycPhoneVerified: (_b = user.kyc) === null || _b === void 0 ? void 0 : _b.phoneVerified,
                verifiedAt: user.phoneVerifiedAt,
            },
        });
    }
    catch (error) {
        console.error('Phone verification error:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to verify phone number',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.verifyPhone = verifyPhone;
