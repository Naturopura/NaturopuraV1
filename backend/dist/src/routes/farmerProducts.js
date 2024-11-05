"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const farmerProducts_1 = require("../controllers/farmerProducts");
const router = express_1.default.Router();
router.post("/listproduct", farmerProducts_1.listProduct);
router.get("/getProduct", farmerProducts_1.getProductsByFarmer);
router.put("/updateProduct", farmerProducts_1.updateProduct);
router.delete("/deleteProduct", farmerProducts_1.deleteProduct);
exports.default = router;
