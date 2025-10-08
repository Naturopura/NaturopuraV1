"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const adminController_1 = require("../controllers/adminController");
const router = express_1.default.Router();
// Admin routes
router.get('/purchases', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.getAdminPurchases);
router.get('/dashboard-stats', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.getDashboardStats);
// Delivery partner management routes
router.get('/delivery-partners', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.getDeliveryPartners);
router.put('/delivery-partners/:id/approval', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.updateDeliveryPartnerApproval);
// Store manager management routes
router.get('/store-managers', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.getStoreManagers);
router.put('/store-managers/:id/approval', [auth_1.authenticateToken, roleCheck_1.isAdmin], adminController_1.updateStoreManagerApproval);
exports.default = router;
