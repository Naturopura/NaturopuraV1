import express from "express";
import { registerSensor, getUserSensors } from "../controllers/sensorController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/register", authenticateToken, registerSensor);
router.get("/", authenticateToken, getUserSensors);

export default router;
