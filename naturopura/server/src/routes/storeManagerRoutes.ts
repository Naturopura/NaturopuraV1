import express from "express";
import { body } from "express-validator";
import {
  addProduct,
  getDashboardStats,
  addVehicle,
  addExportImport,
  updateProductStatus
} from "../controllers/storeManagerController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Add a product
router.post(
  "/products",
  authenticate,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("quantity").isNumeric().withMessage("Quantity must be a number"),
    body("unit").notEmpty().withMessage("Unit is required"),
    body("seller.name").notEmpty().withMessage("Seller name is required"),
    body("seller.contact").notEmpty().withMessage("Seller contact is required"),
    body("status").isIn(["in progress", "delivered"]).withMessage("Invalid status"),
  ],
  addProduct
);

// Update product status
router.put(
  "/products/:id/status",
  authenticate,
  body("status").isIn(["in progress", "delivered"]).withMessage("Invalid status"),
  updateProductStatus
);

// Dashboard stats, vehicles, export/import...
router.get("/dashboard-stats", authenticate, getDashboardStats);
router.post("/vehicles", authenticate, body("vehicleNumber").notEmpty(), addVehicle);
router.post(
  "/export-import",
  authenticate,
  body("type").isIn(["export", "import"]),
  body("count").isNumeric(),
  addExportImport
);

export default router;