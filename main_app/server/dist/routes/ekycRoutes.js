"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ekycRoutes.ts
const express_1 = __importDefault(require("express"));
const ekycController_1 = require("../controllers/ekycController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post('/connect', ekycController_1.aadhaarVerification);
router.post('/generate-otp', ekycController_1.aadhaarGenerateOtp);
router.post('/verify-otp', auth_1.authenticateToken, ekycController_1.aadhaarVerifyOtp);
exports.default = router;
