import express from "express";
import {
  deleteProduct,
  getProductsByFarmer,
  listProduct,
  updateProduct,
} from "../controllers/farmerProducts";

const router = express.Router();

router.post("/listproduct", listProduct);
router.post("/getProduct", getProductsByFarmer);
router.post("/updateProduct", updateProduct);
router.post("/deleteProduct", deleteProduct);

export default router;
