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
exports.handleClearChat = exports.handleDeleteSession = exports.handleUpdateSession = exports.handleGetUserSessions = exports.handleGetOrCreateDefaultSession = exports.handleCreateSession = exports.handleGetMessages = exports.handleImageUpload = exports.handleAiChat = void 0;
const path_1 = __importDefault(require("path"));
const aiService_1 = require("../services/aiService");
const aiDao_1 = require("../dao/aiDao");
const imageAnalysisService_1 = require("../services/imageAnalysisService");
const handleAiChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { prompt, sessionId } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!prompt) {
        res.status(400).json({ message: 'Prompt is required' });
        return;
    }
    if (!sessionId) {
        res.status(400).json({ message: 'Session ID is required' });
        return;
    }
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        // Verify session belongs to user
        const session = yield (0, aiDao_1.getSessionById)(sessionId, userId.toString());
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        yield (0, aiDao_1.saveMessage)({ sender: 'user', text: prompt, userId, sessionId });
        const aiReply = yield (0, aiService_1.getAiResponse)(prompt);
        yield (0, aiDao_1.saveMessage)({ sender: 'ai', text: aiReply, userId, sessionId });
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
    const { sessionId } = req.body;
    if (!req.file) {
        res.status(400).json({ message: 'No image uploaded' });
        return;
    }
    if (!sessionId) {
        res.status(400).json({ message: 'Session ID is required' });
        return;
    }
    const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        // Verify session belongs to user
        const session = yield (0, aiDao_1.getSessionById)(sessionId, userId.toString());
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        console.log('Uploaded file path:', req.file.path);
        const absoluteFilePath = path_1.default.isAbsolute(req.file.path)
            ? req.file.path
            : path_1.default.resolve(req.file.path);
        console.log('Absolute file path:', absoluteFilePath);
        const analysis = yield (0, imageAnalysisService_1.analyzeImage)(absoluteFilePath);
        yield (0, aiDao_1.saveMessage)({ sender: 'user', text: '[Image Uploaded]', userId, sessionId });
        yield (0, aiDao_1.saveMessage)({ sender: 'ai', text: analysis, userId, sessionId });
        res.status(200).json({ result: analysis });
    }
    catch (err) {
        console.error('Error in handleImageUpload:', err);
        res.status(500).json({ message: 'Image analysis failed' });
    }
});
exports.handleImageUpload = handleImageUpload;
const handleGetMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sessionId } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    if (!sessionId) {
        res.status(400).json({ message: 'Session ID is required' });
        return;
    }
    try {
        // Verify session belongs to user
        const session = yield (0, aiDao_1.getSessionById)(sessionId, userId.toString());
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        const messages = yield (0, aiDao_1.getMessagesBySession)(sessionId, userId.toString());
        res.status(200).json({ messages });
    }
    catch (err) {
        console.error('Error in handleGetMessages:', err);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});
exports.handleGetMessages = handleGetMessages;
const handleCreateSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    // Allow empty name for auto-generation
    const sessionName = name && name.trim().length > 0 ? name.trim() : 'New Chat';
    try {
        const session = yield (0, aiDao_1.createSession)({
            name: sessionName,
            userId: userId.toString(),
        });
        res.status(201).json({ session });
    }
    catch (err) {
        console.error('Error creating session:', err);
        res.status(500).json({ message: 'Failed to create session' });
    }
});
exports.handleCreateSession = handleCreateSession;
const handleGetOrCreateDefaultSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        // Check if user has any active sessions
        const sessions = yield (0, aiDao_1.getUserSessions)(userId.toString());
        if (sessions.length > 0) {
            // Return the most recent session
            res.status(200).json({ session: sessions[0] });
        }
        else {
            // Create a default session
            const defaultSession = yield (0, aiDao_1.createSession)({
                name: 'New Chat',
                userId: userId.toString(),
            });
            res.status(201).json({ session: defaultSession });
        }
    }
    catch (err) {
        console.error('Error getting or creating default session:', err);
        res.status(500).json({ message: 'Failed to get or create default session' });
    }
});
exports.handleGetOrCreateDefaultSession = handleGetOrCreateDefaultSession;
const handleGetUserSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        const sessions = yield (0, aiDao_1.getUserSessions)(userId.toString());
        res.status(200).json({ sessions });
    }
    catch (err) {
        console.error('Error fetching sessions:', err);
        res.status(500).json({ message: 'Failed to fetch sessions' });
    }
});
exports.handleGetUserSessions = handleGetUserSessions;
const handleUpdateSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sessionId } = req.params;
    const { name } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    if (!name || name.trim().length === 0) {
        res.status(400).json({ message: 'Session name is required' });
        return;
    }
    try {
        const session = yield (0, aiDao_1.updateSession)(sessionId, userId.toString(), {
            name: name.trim(),
        });
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        res.status(200).json({ session });
    }
    catch (err) {
        console.error('Error updating session:', err);
        res.status(500).json({ message: 'Failed to update session' });
    }
});
exports.handleUpdateSession = handleUpdateSession;
const handleDeleteSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sessionId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    try {
        yield (0, aiDao_1.deleteSession)(sessionId, userId.toString());
        res.status(200).json({ message: 'Session deleted successfully' });
    }
    catch (err) {
        console.error('Error deleting session:', err);
        res.status(500).json({ message: 'Failed to delete session' });
    }
});
exports.handleDeleteSession = handleDeleteSession;
const handleClearChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sessionId } = req.query;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        return;
    }
    if (sessionId) {
        // Clear specific session
        const session = yield (0, aiDao_1.getSessionById)(sessionId, userId.toString());
        if (!session) {
            res.status(404).json({ message: 'Session not found' });
            return;
        }
        try {
            yield (0, aiService_1.clearSessionMessages)(sessionId);
            res.status(200).json({ message: 'Chat cleared for session' });
        }
        catch (err) {
            console.error('Error clearing session chat:', err);
            res.status(500).json({ message: 'Failed to clear session chat' });
        }
    }
    else {
        // Clear all user messages (backward compatibility)
        try {
            yield (0, aiService_1.clearUserMessages)(userId.toString());
            res.status(200).json({ message: 'All chats cleared' });
        }
        catch (err) {
            console.error('Error clearing all chats:', err);
            res.status(500).json({ message: 'Failed to clear all chats' });
        }
    }
});
exports.handleClearChat = handleClearChat;
