import express from "express";
import {
  getAllProducts,
  getCategory,
  getProductById,
  // getProductsByCategory,
  getProductsByCategoryAndPagination,
  searchProducts,
} from "../controllers/userSideApi";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getCategories", getCategory);
router.get("/getProduct/:productId", getProductById);
router.get(
  "/productsByCategoryAndPagination",
  getProductsByCategoryAndPagination
);
router.get("/search", searchProducts);
// router.get("/getProductsByCategory", getProductsByCategory);

export default router;
