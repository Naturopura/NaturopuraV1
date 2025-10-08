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
exports.deleteMessagesByUser = exports.getRecentMessages = exports.saveMessage = void 0;
const AiMessage_1 = require("../models/AiMessage");
const saveMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = new AiMessage_1.AiMessage(message);
    return yield newMessage.save();
});
exports.saveMessage = saveMessage;
const getRecentMessages = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, limit = 10) {
    return yield AiMessage_1.AiMessage.find({ userId }).sort({ createdAt: -1 }).limit(limit);
});
exports.getRecentMessages = getRecentMessages;
const deleteMessagesByUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield AiMessage_1.AiMessage.deleteMany({ userId });
});
exports.deleteMessagesByUser = deleteMessagesByUser;
