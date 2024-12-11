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

const router = express.Router();

router.post("/createCategory", authenticateJWT, createCategory);
router.get("/getCategory", authenticateJWT, getCategory);
router.get("/getProductsByCategory", authenticateJWT, getProductsByCategory);
router.get(
  "/getProductsByCategoryAndPagination",
  authenticateJWT,
  getProductsByCategoryAndPagination
);
router.post("/listproduct", authenticateJWT, listProduct);
router.get("/getProduct", authenticateJWT, getProductsByFarmer);
router.put("/updateProduct", authenticateJWT, updateProduct);
router.delete("/deleteProduct", authenticateJWT, deleteProduct);

export default router;
