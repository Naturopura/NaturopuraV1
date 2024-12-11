import express from "express";
import {
  getAllProducts,
  getProductById,
  // getProductsByCategory,
  getProductsByCategoryAndPagination,
} from "../controllers/userSideApi";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:productId", getProductById);
router.get("/getProduct/:limit", getProductById);
router.get("/getProducts", getProductsByCategoryAndPagination);
// router.get("/getProductsByCategory", getProductsByCategory);

export default router;
