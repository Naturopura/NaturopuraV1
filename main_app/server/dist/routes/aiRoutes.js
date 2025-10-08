"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aiController_1 = require("../controllers/aiController");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/chat', auth_1.authenticateToken, aiController_1.handleAiChat);
router.post('/analyze-image', auth_1.authenticateToken, upload.single('image'), aiController_1.handleImageUpload);
router.get('/messages', auth_1.authenticateToken, aiController_1.handleGetRecentMessages);
router.delete('/messages', auth_1.authenticateToken, aiController_1.handleClearChat);
exports.default = router;
