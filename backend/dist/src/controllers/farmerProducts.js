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
exports.deleteProduct = exports.updateProduct = exports.getProductsByCategoryAndPagination = exports.getProductsByFarmer = exports.listProduct = exports.getProductsByCategory = exports.getCategory = exports.createCategory = void 0;
const admin_farmer_product_1 = __importDefault(require("../models/admin.farmer.product"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const admin_farmer_category_1 = __importDefault(require("../models/admin.farmer.category"));
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        // Validate the request
        if (!name || !image) {
            res.status(400).json({ error: "Please provide both name and image." });
            return;
        }
        // Validate that image is a Base64 string
        const isBase64 = (str) => {
            const base64Regex = /^data:image\/\w+;base64,/;
            return base64Regex.test(str);
        };
        if (!isBase64(image)) {
            res.status(400).json({ error: "Invalid image format." });
            return;
        }
        // Remove Base64 metadata
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        // Check for duplicate category name
        const existingCategory = yield admin_farmer_category_1.default.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ error: "Category name must be unique." });
            return;
        }
        // Create a new category
        const category = new admin_farmer_category_1.default({
            name,
            image: Buffer.from(base64Data, "base64"), // Convert Base64 image to binary buffer
        });
        // Save to database
        const savedCategory = yield category.save();
        // Return success response
        res.status(201).json({
            message: "Category created successfully.",
            category: savedCategory,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createCategory = createCategory;
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
const getProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.query;
    // console.log("Received Category ID:", req.query.categoryId);
    if (!categoryId) {
        return res.status(400).json({ error: "Category ID is required" });
    }
    try {
        const products = yield admin_farmer_product_1.default.find({ category: categoryId })
            .populate("category")
            .exec();
        console.log("Category ID:", categoryId);
        console.log("Fetched Products:", products);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const listProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract data from the request body
        const { name, category, price, quantity, description, unit, image, currency, } = req.body;
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Use req.user from AuthenticatedRequest
        console.log("Received request to list product for farmer:", farmerId);
        // Ensure all required fields are provided
        if (!farmerId ||
            !name ||
            !category ||
            !price ||
            !quantity ||
            !image ||
            !unit ||
            !currency) {
            return res.status(400).json({
                error: "Please provide all required fields: name, category, price, quantity, and image.",
            });
        }
        // Check if the farmer exists
        console.log("Checking if farmer exists...");
        const farmerExists = yield admin_model_1.default.findById(farmerId);
        console.log("here is farmerid", farmerExists);
        if (!farmerExists) {
            return res.status(404).json({ error: "Farmer does not exist." });
        }
        console.log("Fetching category details...");
        const categoryExists = yield admin_farmer_category_1.default.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category does not exist." });
        }
        // Create a new product using the Product model
        const newProduct = new admin_farmer_product_1.default({
            farmerId,
            name,
            category: categoryExists._id,
            price,
            quantity,
            unit,
            description,
            image,
            currency,
        });
        // Save the product to the database
        console.log("Saving product to database...");
        const savedProduct = yield newProduct.save();
        // Return the saved product as the response
        res.status(201).json({
            message: "Product listed successfully.",
            product: savedProduct,
            category: categoryExists,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.listProduct = listProduct;
const getProductsByFarmer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log("Fetching products for farmer:", farmerId);
        if (!farmerId) {
            return res
                .status(400)
                .json({ error: "Farmer ID is missing in the token." });
        }
        console.log("------------------------------");
        const farmerProducts = yield admin_farmer_product_1.default.find({ farmerId })
            .populate("category")
            .exec();
        console.log("farmerProducts", farmerProducts);
        if (farmerProducts.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found for this farmer." });
        }
        res.status(200).json(farmerProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductsByFarmer = getProductsByFarmer;
const getProductsByCategoryAndPagination = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, categoryId } = req.query;
        // Parse page and limit to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;
        // Build the query conditionally based on categoryId
        const query = {};
        if (categoryId) {
            query.category = categoryId;
        }
        // Fetch products with pagination and filtering
        const products = yield admin_farmer_product_1.default.find(query)
            .populate("category")
            .skip(skip)
            .limit(limitNumber)
            .sort({ createdAt: -1 });
        // Get the total count of products for the given query
        const totalProducts = yield admin_farmer_product_1.default.countDocuments(query);
        // If no products are found
        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found for the given criteria." });
        }
        // Return products with pagination metadata
        return res.status(200).json({
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
        res.status(500).json({ error: error.message });
    }
});
exports.getProductsByCategoryAndPagination = getProductsByCategoryAndPagination;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id, name, category, price, quantity, description, image, unit, currency, } = req.body;
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log("Updating product:", _id);
        if (!_id || !farmerId) {
            return res
                .status(400)
                .json({ error: "Please provide both productId and farmerId." });
        }
        const existingCategory = yield admin_farmer_category_1.default.findById(category);
        if (!existingCategory) {
            return res
                .status(400)
                .json({ error: "The specified category does not exist." });
        }
        const updatedProduct = yield admin_farmer_product_1.default.findOneAndUpdate({ _id: _id, farmerId }, {
            name,
            category: existingCategory._id,
            price,
            quantity,
            description,
            image,
            unit,
            currency,
        }, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or not authorized to update." });
        }
        res.status(200).json({
            updatedProduct: updatedProduct,
            message: "Product Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productId } = req.body;
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        console.log("Deleting product:", productId);
        if (!productId || !farmerId) {
            return res
                .status(400)
                .json({ error: "Please provide both productId and farmerId." });
        }
        const deletedProduct = yield admin_farmer_product_1.default.findOneAndDelete({
            _id: productId,
            farmerId,
        });
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or not authorized to delete." });
        }
        res
            .status(200)
            .json({ message: "Product deleted successfully", deletedProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
