"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const equipmentController_1 = require("../controllers/equipmentController");
const router = express_1.default.Router();
// All routes here require vendor authentication
router.use(auth_1.authenticateToken);
router.get('/equipments', equipmentController_1.getVendorEquipments);
router.post('/equipments/add', equipmentController_1.addVendorEquipment);
router.put('/equipments/:id', equipmentController_1.updateVendorEquipment);
router.delete('/equipments/:id', equipmentController_1.deleteVendorEquipment);
exports.default = router;
