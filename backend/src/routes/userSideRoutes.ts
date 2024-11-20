import express from "express";
import { getAllProducts, getProductById } from "../controllers/userSideApi";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:productId", getProductById);

export default router;
