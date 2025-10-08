"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const equipmentSearchController_1 = require("../controllers/equipmentSearchController");
const router = express_1.default.Router();
router.use(auth_1.authenticateToken);
router.get('/search', equipmentSearchController_1.searchEquipments);
router.post('/requests/status', equipmentSearchController_1.getRequestStatuses);
exports.default = router;
