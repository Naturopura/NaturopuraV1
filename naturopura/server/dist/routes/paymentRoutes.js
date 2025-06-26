"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const paymentController_1 = require("../controllers/paymentController");
const router = express_1.default.Router();
// Test payment route
router.post('/test-payment', auth_1.authenticateToken, paymentController_1.processTestPayment);
// Crypto purchase route
router.post('/purchase', auth_1.authenticateToken, paymentController_1.processCryptoPurchase);
// Update purchase address route
router.put('/purchase/:purchaseId/address', auth_1.authenticateToken, paymentController_1.updatePurchaseAddress);
router.get('/purchase/:purchaseId/address', auth_1.authenticateToken, paymentController_1.getPurchaseAddress);
router.get('/purchase/:purchaseId', auth_1.authenticateToken, paymentController_1.getPurchaseDetails);
exports.default = router;
