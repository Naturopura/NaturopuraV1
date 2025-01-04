"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSideApi_1 = require("../controllers/userSideApi");
const router = express_1.default.Router();
router.get("/getAllProducts", userSideApi_1.getAllProducts);
router.get("/getCategories", userSideApi_1.getCategory);
router.get("/getProduct/:productId", userSideApi_1.getProductById);
router.get("/productsByCategoryAndPagination", userSideApi_1.getProductsByCategoryAndPagination);
router.get("/search", userSideApi_1.searchProducts);
// router.get("/getProductsByCategory", getProductsByCategory);
exports.default = router;
