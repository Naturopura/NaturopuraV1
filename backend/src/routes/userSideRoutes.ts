import express from "express";
import { getAllProducts, getProductById, getProductsByCategoryAndPagination } from "../controllers/userSideApi";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:productId", getProductById);
router.get("/getProduct/:limit", getProductById);
router.get("/getProducts", getProductsByCategoryAndPagination);


export default router;
