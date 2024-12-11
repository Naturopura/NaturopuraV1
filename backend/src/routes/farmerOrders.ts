import express from "express";
import authenticateJWT from "./../middlewares/authenticateToken";
import { newOrder } from "../controllers/farmerOrders";

const router = express.Router();

router.post("/neworder", newOrder);

export default router;
