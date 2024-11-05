import express from "express";
import {
  deleteProduct,
  getProductsByFarmer,
  listProduct,
  updateProduct,
} from "../controllers/farmerProducts";

const router = express.Router();

router.post("/listproduct", listProduct);
router.get("/getProduct", getProductsByFarmer);
router.put("/updateProduct", updateProduct);
router.delete("/deleteProduct", deleteProduct);

export default router;
