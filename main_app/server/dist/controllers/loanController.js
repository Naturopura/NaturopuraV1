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
exports.getLoanStats = exports.updateLoanStatus = exports.getLoanById = exports.getFarmerLoans = exports.getAllLoans = exports.createLoan = void 0;
const express_validator_1 = require("express-validator");
const loanService = __importStar(require("../services/loanService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'Not authenticated',
            });
            return;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array(),
            });
            return;
        }
        const { amount, purpose, term, collateral, cropType, landSize, farmDetails, } = req.body;
        const loanData = {
            farmer: req.user._id,
            amount,
            purpose,
            term,
            collateral,
            cropType,
            landSize,
            farmDetails,
        };
        const savedLoan = yield loanService.createLoan(loanData);
        res.status(statusCode_1.default.CREATED).json({
            success: true,
            message: 'Loan application submitted successfully',
            data: savedLoan,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : 'Error creating loan application',
        });
    }
});
exports.createLoan = createLoan;
const getAllLoans = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loans = yield loanService.getAllLoans();
        res.status(statusCode_1.default.OK).json({
            success: true,
            count: loans.length,
            data: loans,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
    }
});
exports.getAllLoans = getAllLoans;
const getFarmerLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
            return;
        }
        const loans = yield loanService.getLoansByFarmerId(req.user._id);
        res.status(statusCode_1.default.OK).json({
            success: true,
            count: loans.length,
            data: loans,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
    }
});
exports.getFarmerLoans = getFarmerLoans;
const getLoanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Not authenticated' });
            return;
        }
        const loan = yield loanService.getLoanById(req.params.id);
        if (!loan) {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Loan not found' });
            return;
        }
        // Check access rights
        const isOwner = loan.farmer && typeof loan.farmer === 'object'
            ? loan.farmer._id.toString() === req.user._id.toString()
            : false;
        if (req.user.role !== 'admin' && !isOwner) {
            res.status(statusCode_1.default.FORBIDDEN).json({
                success: false,
                message: 'Not authorized to access this loan',
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({ success: true, data: loan });
    }
    catch (error) {
        if (error.kind === 'ObjectId') {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Loan not found' });
            return;
        }
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
    }
});
exports.getLoanById = getLoanById;
const updateLoanStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(statusCode_1.default.BAD_REQUEST).json({ errors: errors.array() });
        return;
    }
    try {
        const { status, rejectionReason } = req.body;
        const updatedLoan = yield loanService.updateLoanStatus(req.params.id, status, rejectionReason);
        res.status(statusCode_1.default.OK).json({ success: true, data: updatedLoan });
    }
    catch (error) {
        if (error.message === 'Loan not found') {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Loan not found' });
            return;
        }
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
    }
});
exports.updateLoanStatus = updateLoanStatus;
const getLoanStats = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield loanService.getLoanStats();
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: 'Server Error' });
    }
});
exports.getLoanStats = getLoanStats;
