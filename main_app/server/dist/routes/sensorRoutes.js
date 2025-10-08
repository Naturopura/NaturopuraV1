"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sensorController_1 = require("../controllers/sensorController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/register", auth_1.authenticateToken, sensorController_1.registerSensor);
router.get("/", auth_1.authenticateToken, sensorController_1.getUserSensors);
exports.default = router;
