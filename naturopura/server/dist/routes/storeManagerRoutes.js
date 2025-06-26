"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const storeManagerController_1 = require("../controllers/storeManagerController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Add a product
router.post("/products", authMiddleware_1.authenticate, [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required"),
    (0, express_validator_1.body)("price").isNumeric().withMessage("Price must be a number"),
    (0, express_validator_1.body)("quantity").isNumeric().withMessage("Quantity must be a number"),
    (0, express_validator_1.body)("unit").notEmpty().withMessage("Unit is required"),
    (0, express_validator_1.body)("seller.name").notEmpty().withMessage("Seller name is required"),
    (0, express_validator_1.body)("seller.contact").notEmpty().withMessage("Seller contact is required"),
    (0, express_validator_1.body)("status").isIn(["in progress", "delivered"]).withMessage("Invalid status"),
], storeManagerController_1.addProduct);
// Update product status
router.put("/products/:id/status", authMiddleware_1.authenticate, (0, express_validator_1.body)("status").isIn(["in progress", "delivered"]).withMessage("Invalid status"), storeManagerController_1.updateProductStatus);
// Dashboard stats, vehicles, export/import...
router.get("/dashboard-stats", authMiddleware_1.authenticate, storeManagerController_1.getDashboardStats);
router.post("/vehicles", authMiddleware_1.authenticate, (0, express_validator_1.body)("vehicleNumber").notEmpty(), storeManagerController_1.addVehicle);
router.post("/export-import", authMiddleware_1.authenticate, (0, express_validator_1.body)("type").isIn(["export", "import"]), (0, express_validator_1.body)("count").isNumeric(), storeManagerController_1.addExportImport);
exports.default = router;
