import express from "express";
import authenticateJWT from "./../middlewares/authenticateToken";
import {
  deleteProduct,
  getProductsByFarmer,
  listProduct,
  updateProduct,
} from "../controllers/farmerProducts";

const router = express.Router();

router.post("/listproduct", authenticateJWT, listProduct);
router.get("/getProduct", authenticateJWT, getProductsByFarmer);
router.put("/updateProduct", authenticateJWT, updateProduct);
router.delete("/deleteProduct", authenticateJWT, deleteProduct);

export default router;
