"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.getProductsByCategoryAndPagination = exports.getAllProducts = void 0;
const admin_farmer_product_1 = __importDefault(require("../models/admin.farmer.product"));
// Existing function to list all products
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield admin_farmer_product_1.default.find({});
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductsByCategoryAndPagination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, page = 1, limit = 6 } = req.query;
        // Parse page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 6);
        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;
        // Build the query filter
        const filter = category ? { category } : {};
        // Fetch products with pagination and filtering
        const products = yield admin_farmer_product_1.default.find(filter).skip(skip).limit(limitNumber);
        // Get the total count of products for the given filter
        const totalProducts = yield admin_farmer_product_1.default.countDocuments(filter);
        // If no products are found
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        // Return products with pagination metadata
        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total: totalProducts,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalProducts / limitNumber),
                limit: limitNumber,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductsByCategoryAndPagination = getProductsByCategoryAndPagination;
// New function to get product details by ID
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract productId from the request parameters
        const { productId } = req.params;
        console.log("Fetching product details for ID:", productId);
        // Validate productId
        if (!productId) {
            return res.status(400).json({ error: "Product ID is required." });
        }
        // Fetch the product from the database using its ID
        const product = yield admin_farmer_product_1.default.findById(productId);
        // Check if the product exists
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        // Return the product details
        return res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.getProductById = getProductById;
