"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const router = express_1.default.Router();
router.post('/', auth_1.authenticateToken, feedbackController_1.createFeedback);
router.get('/', auth_1.authenticateToken, roleCheck_1.isAdmin, feedbackController_1.getAllFeedbacks);
exports.default = router;
