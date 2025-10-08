"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const equipmentRequestController_1 = require("../controllers/equipmentRequestController");
const equipmentRequestController_2 = require("../controllers/equipmentRequestController");
const router = express_1.default.Router();
router.use(auth_1.authenticateToken);
router.get('/my-requests', equipmentRequestController_1.getMyRequests);
router.post('/', equipmentRequestController_2.createEquipmentRequest);
exports.default = router;
