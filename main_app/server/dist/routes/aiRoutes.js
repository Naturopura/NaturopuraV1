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
// Regular endpoints
router.post('/chat', auth_1.authenticateToken, aiController_1.handleAiChat);
router.post('/analyze-image', auth_1.authenticateToken, upload.single('image'), aiController_1.handleImageUpload);
router.get('/messages', auth_1.authenticateToken, aiController_1.handleGetMessages);
router.post('/sessions', auth_1.authenticateToken, aiController_1.handleCreateSession);
router.get('/sessions', auth_1.authenticateToken, aiController_1.handleGetUserSessions);
router.get('/sessions/default', auth_1.authenticateToken, aiController_1.handleGetOrCreateDefaultSession);
router.put('/sessions/:sessionId', auth_1.authenticateToken, aiController_1.handleUpdateSession);
router.delete('/sessions/:sessionId', auth_1.authenticateToken, aiController_1.handleDeleteSession);
router.delete('/messages', auth_1.authenticateToken, aiController_1.handleClearChat);
exports.default = router;
