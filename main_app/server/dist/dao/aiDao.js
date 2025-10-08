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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.updateSession = exports.getSessionById = exports.getUserSessions = exports.createSession = exports.deleteMessagesByUser = exports.deleteMessagesBySession = exports.getMessagesBySession = exports.getRecentMessages = exports.saveMessage = void 0;
const AiMessage_1 = require("../models/AiMessage");
const AiSession_1 = require("../models/AiSession");
const saveMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = new AiMessage_1.AiMessage(message);
    const savedMessage = yield newMessage.save();
    // Update session's lastMessageAt
    if (message.sessionId) {
        yield AiSession_1.AiSession.findByIdAndUpdate(message.sessionId, {
            lastMessageAt: new Date()
        });
    }
    return savedMessage;
});
exports.saveMessage = saveMessage;
const getRecentMessages = (sessionId_1, ...args_1) => __awaiter(void 0, [sessionId_1, ...args_1], void 0, function* (sessionId, limit = 50) {
    return yield AiMessage_1.AiMessage.find({ sessionId }).sort({ createdAt: 1 }).limit(limit);
});
exports.getRecentMessages = getRecentMessages;
const getMessagesBySession = (sessionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AiMessage_1.AiMessage.find({ sessionId, userId }).sort({ createdAt: 1 });
});
exports.getMessagesBySession = getMessagesBySession;
const deleteMessagesBySession = (sessionId) => __awaiter(void 0, void 0, void 0, function* () {
    yield AiMessage_1.AiMessage.deleteMany({ sessionId });
});
exports.deleteMessagesBySession = deleteMessagesBySession;
const deleteMessagesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield AiMessage_1.AiMessage.deleteMany({ userId });
});
exports.deleteMessagesByUser = deleteMessagesByUser;
// Session-related DAO functions
const createSession = (sessionData) => __awaiter(void 0, void 0, void 0, function* () {
    const newSession = new AiSession_1.AiSession(sessionData);
    return yield newSession.save();
});
exports.createSession = createSession;
const getUserSessions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AiSession_1.AiSession.find({ userId, isActive: true })
        .sort({ lastMessageAt: -1, createdAt: -1 });
});
exports.getUserSessions = getUserSessions;
const getSessionById = (sessionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AiSession_1.AiSession.findOne({ _id: sessionId, userId });
});
exports.getSessionById = getSessionById;
const updateSession = (sessionId, userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield AiSession_1.AiSession.findOneAndUpdate({ _id: sessionId, userId }, updates, { new: true });
});
exports.updateSession = updateSession;
const deleteSession = (sessionId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete all messages in the session
    yield (0, exports.deleteMessagesBySession)(sessionId);
    // Soft delete the session
    yield AiSession_1.AiSession.findOneAndUpdate({ _id: sessionId, userId }, { isActive: false });
});
exports.deleteSession = deleteSession;
