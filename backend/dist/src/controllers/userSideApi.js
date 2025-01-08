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
exports.searchFilterAndSortProducts = exports.getProductById = exports.getProductsByCategoryAndPagination = exports.getCategory = exports.getAllProducts = void 0;
const admin_farmer_product_1 = __importDefault(require("../models/admin.farmer.product"));
const mongoose_1 = __importDefault(require("mongoose"));
const admin_farmer_category_1 = __importDefault(require("../models/admin.farmer.category"));
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
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all categories from the database
        const categories = yield admin_farmer_category_1.default.find({}, "name _id image");
        // Check if no categories exist
        if (!categories.length) {
            res.status(404).json({ error: "No categories found." });
            return;
        }
        // Return the list of categories
        res.status(200).json({
            message: "Categories retrieved successfully.",
            categories,
        });
    }
    catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
});
exports.getCategory = getCategory;
const getProductsByCategoryAndPagination = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, page = 1, limit = 6 } = req.query;
        // Ensure categoryId is provided
        if (!categoryId) {
            res
                .status(400)
                .json({ success: false, message: "categoryId is required." });
            return;
        }
        // Validate categoryId
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            res.status(400).json({ success: false, message: "Invalid categoryId." });
            return;
        }
        // Parse page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        // Validate pagination parameters
        if (!pageNumber || pageNumber < 1) {
            res.status(400).json({ success: false, message: "Invalid page number." });
            return;
        }
        if (!limitNumber || limitNumber < 1) {
            res
                .status(400)
                .json({ success: false, message: "Invalid limit number." });
            return;
        }
        // Calculate documents to skip
        const skip = (pageNumber - 1) * limitNumber;
        // Build query filter
        const filter = {
            category: new mongoose_1.default.Types.ObjectId(categoryId),
        };
        // Fetch products with pagination and sorting
        const products = yield admin_farmer_product_1.default.find(filter)
            .populate("category") // Populates category details if needed
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 }); // Sort by newest first
        console.log("Products:", products.length);
        // Get total product count for the filter
        const totalProducts = yield admin_farmer_product_1.default.countDocuments(filter);
        console.log("Total Products:", totalProducts);
        // Respond with paginated data
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                totalProducts: totalProducts,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalProducts / limitNumber),
                limit: limitNumber,
            },
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});
exports.getProductsByCategoryAndPagination = getProductsByCategoryAndPagination;
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
const searchFilterAndSortProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, category, minPrice, maxPrice, limit = 6, page = 1, sort = "all", } = req.query;
        // Build the filter object dynamically
        const filter = {};
        // Add search query to filter
        if (query) {
            filter.name = { $regex: query, $options: "i" }; // Case-insensitive regex search
        }
        // Add category filter
        if (category) {
            if (mongoose_1.default.Types.ObjectId.isValid(category)) {
                filter.category = new mongoose_1.default.Types.ObjectId(category);
            }
            else {
                res.status(400).json({ error: "Invalid category ID" });
                return;
            }
        }
        // Add price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = parseFloat(minPrice);
            if (maxPrice)
                filter.price.$lte = parseFloat(maxPrice);
        }
        // Convert pagination params to numbers
        const limitNum = parseInt(limit, 10) || 6;
        const pageNum = parseInt(page, 10) || 1;
        // Determine sorting logic
        let sortOption = {};
        switch (sort) {
            case "newest":
                sortOption = { createdAt: -1 }; // Newest first
                break;
            case "price_low_to_high":
                sortOption = { price: 1 }; // Price ascending
                break;
            case "price_high_to_low":
                sortOption = { price: -1 }; // Price descending
                break;
            case "all":
            default:
                sortOption = {}; // No specific sorting
                break;
        }
        // Calculate total products and total pages
        const totalProducts = yield admin_farmer_product_1.default.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limitNum);
        // Fetch paginated and sorted results
        const products = yield admin_farmer_product_1.default.find(filter)
            .populate("category")
            .sort(sortOption)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);
        // Respond with results
        res.status(200).json({
            success: true,
            message: "Products search, filter, and sort successful",
            data: {
                products: products,
                pagination: {
                    totalProducts: totalProducts,
                    currentPage: pageNum,
                    totalPages: totalPages,
                    limit: limitNum,
                },
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred during product search, filter, and sort",
            error,
        });
    }
});
exports.searchFilterAndSortProducts = searchFilterAndSortProducts;
