import express from "express";
import authenticateJWT from "./../middlewares/authenticateToken";
import {
  createCategory,
  deleteProduct,
  getCategory,
  getProductsByCategory,
  getProductsByFarmer,
  getProductsByCategoryAndPagination,
  listProduct,
  updateProduct,
} from "../controllers/farmerProducts";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post(
  "/createCategory",
  authenticateJWT,
  upload.single("image"),
  createCategory
);
router.get("/getCategory", authenticateJWT, getCategory);
router.get("/getProductsByCategory", authenticateJWT, getProductsByCategory);
router.get(
  "/getProductsByCategoryAndPagination",
  authenticateJWT,
  getProductsByCategoryAndPagination
);
router.post(
  "/listproduct",
  authenticateJWT,
  upload.single("image"),
  listProduct
);
router.get("/getProduct", authenticateJWT, getProductsByFarmer);
router.put("/updateProduct", authenticateJWT, updateProduct);
router.delete("/deleteProduct", authenticateJWT, deleteProduct);

export default router;
