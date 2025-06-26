"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const deliveryPartnerApproval_1 = require("../middleware/deliveryPartnerApproval");
const adminController_1 = require("../controllers/adminController");
const authController_1 = require("../controllers/authController");
const roleCheck_1 = require("../middleware/roleCheck");
const router = express_1.default.Router();
router.post('/register', userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/validate', auth_1.authenticateToken, (req, res, next) => {
    try {
        (0, authController_1.verifyToken)(req, res);
    }
    catch (error) {
        next(error);
    }
});
router.get('/farmers', auth_1.authenticateToken, roleCheck_1.isAdmin, adminController_1.getFarmers);
router.get('/phone-verification-status', auth_1.authenticateToken, (req, res, next) => { res.status(200).json({ success: true, verified: true }); next(); });
router.put('/profile', auth_1.authenticateToken, (req, res, next) => { res.status(200).json({ success: true, message: 'Profile updated' }); next(); });
router.get('/shipping-address', auth_1.authenticateToken, userController_1.getShippingAddress);
router.put('/shipping-address', auth_1.authenticateToken, userController_1.updateShippingAddress);
// Address management routes
router.get('/addresses', auth_1.authenticateToken, userController_1.getUserAddresses);
router.post('/addresses', auth_1.authenticateToken, userController_1.addAddress);
router.put('/addresses/:addressId', auth_1.authenticateToken, userController_1.updateAddress);
router.delete('/addresses/:addressId', auth_1.authenticateToken, userController_1.deleteAddress);
// Delivery partner routes example
router.get('/delivery/details', auth_1.authenticateToken, deliveryPartnerApproval_1.checkDeliveryPartnerApproval, (req, res) => {
    // Placeholder for delivery partner delivery details handler
    res.json({ success: true, message: 'Delivery partner delivery details endpoint' });
});
// Delivery partner purchases route
router.get('/delivery-partner/purchases', auth_1.authenticateToken, deliveryPartnerApproval_1.checkDeliveryPartnerApproval, adminController_1.getDeliveryPartnerPurchases);
exports.default = router;
