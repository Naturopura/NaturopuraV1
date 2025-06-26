"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const logisticsController_1 = require("../controllers/logisticsController");
const router = express_1.default.Router();
router.post('/initialize', authMiddleware_1.authenticate, logisticsController_1.initializeLogistics);
router.put('/:productId/update', authMiddleware_1.authenticate, logisticsController_1.updateLogisticsStep);
router.get('/:productId', authMiddleware_1.authenticate, logisticsController_1.getLogisticsStatus);
router.put('/:productId/status', authMiddleware_1.authenticate, logisticsController_1.updateLogisticsStep);
exports.default = router;
