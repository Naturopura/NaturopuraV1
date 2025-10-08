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
exports.getAllFeedbacks = exports.createFeedback = void 0;
const feedbackService = __importStar(require("../services/feedbackService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const createFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Not authenticated' });
            return;
        }
        const { message, phoneNumber, rating, category } = req.body;
        if (!message) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Message is required' });
            return;
        }
        yield feedbackService.createFeedback({
            userId: req.user._id,
            name: req.user.name,
            email: req.user.email,
            message,
            phoneNumber,
            rating,
            category,
        });
        res.status(statusCode_1.default.CREATED).json({ message: 'Feedback submitted successfully' });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Server error submitting feedback',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.createFeedback = createFeedback;
const getAllFeedbacks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, sort = 'createdAt', order = 'desc', page = '1', limit = '10', } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const data = yield feedbackService.getAllFeedbacks({
            search: search,
            category: category,
            sort: sort,
            order: order === 'asc' ? 'asc' : 'desc',
            page: isNaN(pageNumber) ? 1 : pageNumber,
            limit: isNaN(limitNumber) ? 10 : limitNumber,
        });
        res.status(statusCode_1.default.OK).json(data);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Server error fetching feedbacks',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getAllFeedbacks = getAllFeedbacks;
