import express from "express";
import { addSensorData, getSensorData } from "../controllers/sensorDataController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticateToken, addSensorData);
router.get("/:sensorId", authenticateToken, getSensorData);

export default router;
