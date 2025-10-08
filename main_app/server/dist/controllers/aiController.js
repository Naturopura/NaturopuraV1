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
exports.handleClearChat = exports.handleGetRecentMessages = exports.handleImageUpload = exports.handleAiChat = void 0;
const path_1 = __importDefault(require("path"));
const aiService_1 = require("../services/aiService");
const aiDao_1 = require("../dao/aiDao");
const imageAnalysisService_1 = require("../services/imageAnalysisService");
const aiDao_2 = require("../dao/aiDao");
const handleAiChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { prompt } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!prompt) {
        res.status(400).json({ message: 'Prompt is required' });
        return;
    }
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        yield (0, aiDao_1.saveMessage)({ sender: 'user', text: prompt, userId });
        const aiReply = yield (0, aiService_1.getAiResponse)(prompt);
        yield (0, aiDao_1.saveMessage)({ sender: 'ai', text: aiReply, userId });
        res.status(200).json({ reply: aiReply });
    }
    catch (err) {
        console.error('Error in handleAiChat:', err);
        res.status(500).json({ message: 'AI failed to respond' });
    }
});
exports.handleAiChat = handleAiChat;
const handleImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.file) {
        res.status(400).json({ message: 'No image uploaded' });
        return;
    }
    try {
        console.log('Uploaded file path:', req.file.path);
        const absoluteFilePath = path_1.default.isAbsolute(req.file.path)
            ? req.file.path
            : path_1.default.resolve(req.file.path);
        console.log('Absolute file path:', absoluteFilePath);
        const analysis = yield (0, imageAnalysisService_1.analyzeImage)(absoluteFilePath);
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        yield (0, aiDao_1.saveMessage)({ sender: 'user', text: '[Image Uploaded]', userId });
        yield (0, aiDao_1.saveMessage)({ sender: 'ai', text: analysis, userId });
        res.status(200).json({ result: analysis });
    }
    catch (err) {
        console.error('Error in handleImageUpload:', err);
        res.status(500).json({ message: 'Image analysis failed' });
    }
});
exports.handleImageUpload = handleImageUpload;
const handleGetRecentMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        const messages = yield (0, aiDao_2.getRecentMessages)(userId.toString(), 50);
        res.status(200).json({ messages });
    }
    catch (err) {
        console.error('Error in handleGetRecentMessages:', err);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});
exports.handleGetRecentMessages = handleGetRecentMessages;
const handleClearChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        yield (0, aiService_1.clearUserMessages)(userId.toString());
        res.status(200).json({ message: 'Chat cleared' });
    }
    catch (err) {
        console.error('Error clearing chat:', err);
        res.status(500).json({ message: 'Failed to clear chat' });
    }
});
exports.handleClearChat = handleClearChat;
