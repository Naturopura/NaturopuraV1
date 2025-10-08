"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const insuranceController_1 = require("../controllers/insuranceController");
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const router = express_1.default.Router();
router.post('/apply', auth_1.authenticateToken, insuranceController_1.applyInsurance);
router.get('/my', auth_1.authenticateToken, insuranceController_1.getMyInsurance);
router.get('/all', auth_1.authenticateToken, insuranceController_1.getAllInsurances);
router.put('/:id/status', auth_1.authenticateToken, roleCheck_1.isAdmin, insuranceController_1.updateInsuranceStatus);
exports.default = router;
