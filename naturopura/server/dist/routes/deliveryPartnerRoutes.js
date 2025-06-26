"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const deliveryPartnerController_1 = require("../controllers/deliveryPartnerController");
const router = express_1.default.Router();
// All routes require authentication
router.use(authMiddleware_1.authenticate);
// Get available purchases for delivery partner to claim
router.get('/available', deliveryPartnerController_1.getAvailablePurchasesController);
// Assign delivery partner to a purchase
router.post('/assign/:purchaseId', deliveryPartnerController_1.assignPurchaseController);
// Get all purchases assigned to this delivery partner
router.get('/assigned', deliveryPartnerController_1.getAssignedPurchasesController);
exports.default = router;
