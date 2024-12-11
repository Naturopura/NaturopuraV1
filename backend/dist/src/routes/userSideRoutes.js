"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSideApi_1 = require("../controllers/userSideApi");
const router = express_1.default.Router();
router.get("/getAllProducts", userSideApi_1.getAllProducts);
router.get("/getProduct/:productId", userSideApi_1.getProductById);
router.get("/getProduct/:limit", userSideApi_1.getProductById);
router.get("/getProducts", userSideApi_1.getProductsByCategoryAndPagination);
// router.get("/getProductsByCategory", getProductsByCategory);
exports.default = router;
