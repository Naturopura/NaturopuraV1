"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const roleCheck_1 = require("../middleware/roleCheck");
const adminEquipmentRequestController_1 = require("../controllers/adminEquipmentRequestController");
const router = express_1.default.Router();
router.use(auth_1.authenticateToken);
router.use(roleCheck_1.isAdmin);
router.get('/equipment-requests', adminEquipmentRequestController_1.getAllRequests);
router.put('/equipment-requests/:id/status', adminEquipmentRequestController_1.updateRequestStatus);
exports.default = router;
