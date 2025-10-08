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
exports.findAllFeedbacks = exports.createFeedbackRecord = void 0;
const Feedback_1 = __importDefault(require("../models/Feedback"));
const createFeedbackRecord = (feedbackData) => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = new Feedback_1.default(feedbackData);
    return yield feedback.save();
});
exports.createFeedbackRecord = createFeedbackRecord;
const findAllFeedbacks = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = options;
    const query = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }
    if (category) {
        query.category = category;
    }
    const pageNumber = page;
    const limitNumber = limit;
    const skip = (pageNumber - 1) * limitNumber;
    const sortOptions = {
        [sort]: order === 'asc' ? 1 : -1,
    };
    const feedbacks = yield Feedback_1.default.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber);
    const total = yield Feedback_1.default.countDocuments(query);
    return {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
        feedbacks,
    };
});
exports.findAllFeedbacks = findAllFeedbacks;
