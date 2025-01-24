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
const imageUpload_1 = require("./imageUpload");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.fieldname;
        const imagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        // Validate the request
        if (!name || !image || !imagePath) {
            return res
                .status(400)
                .json({ error: "Please provide both name and image." });
        }
        const uploader = new imageUpload_1.FileUploader();
        const filePath = imagePath;
        const fileName = image;
        const result = yield uploader.uploadFile({ filePath, fileName });
        const { secure_url, public_id } = result;
        if (!secure_url) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image",
                error: secure_url,
            });
        }
        // Check for duplicate category name
        const existingCategory = yield admin_farmer_category_1.default.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ error: "Category name must be unique." });
            return;
        }
        // Create a new category
        const category = new admin_farmer_category_1.default({
            name,
            image: public_id, // Convert Base64 image to binary buffer
        });
        // Save to database
        const savedCategory = yield category.save();
        // Return success response
        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: Object.assign(Object.assign({}, savedCategory.toObject()), { image: secure_url }),
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
        // Initialize the FileUploader instance
        const fileUploader = new imageUpload_1.FileUploader();
        // Get the secure URL for each product image
        const categoriesWithSecureUrl = yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
            const secureUrl = yield fileUploader.getSecureUrlFromPublicId(category.image);
            return Object.assign(Object.assign({}, category.toObject()), { image: secureUrl });
        })));
        // Return the list of categories
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully.",
            data: categoriesWithSecureUrl,
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
    var _a, _b, _c;
    try {
        // Extract data from request body
        const { name, category, price, quantity, description, unit, currency } = req.body;
        console.log("Request File: ", req.file);
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.fieldname;
        const imagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        const farmerId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id; // Use req.user from AuthenticatedRequest
        if (!farmerId ||
            !name ||
            !category ||
            !price ||
            !quantity ||
            !unit ||
            !currency ||
            !image ||
            !imagePath) {
            return res.status(400).json({
                error: "Please provide all required fields: name, category, price, quantity, and image.",
            });
        }
        const uploader = new imageUpload_1.FileUploader();
        const filePath = imagePath;
        const fileName = image;
        // Call the uploadFile method to get the file's secure_url and public_id
        const result = yield uploader.uploadFile({ filePath, fileName });
        const { secure_url, public_id } = result;
        if (!secure_url) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image",
                error: secure_url,
            });
        }
        console.log("Request File", req.file);
        // Check if the farmer exists
        const farmerExists = yield admin_model_1.default.findById(farmerId);
        if (!farmerExists) {
            return res.status(404).json({ error: "Farmer does not exist." });
        }
        const categoryExists = yield admin_farmer_category_1.default.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ error: "Category does not exist." });
        }
        const newProduct = new admin_farmer_product_1.default({
            farmerId,
            name,
            category: categoryExists._id,
            price,
            quantity,
            unit,
            description,
            image: public_id,
            currency,
        });
        // Save the product to the database
        const savedProduct = yield newProduct.save();
        res.status(201).json({
            success: true,
            message: "Product listed successfully.",
            data: Object.assign(Object.assign({}, savedProduct.toObject()), { image: secure_url }),
        });
    }
    catch (error) {
        console.error("Error in listing product:", error);
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
        // Initialize the FileUploader instance
        const fileUploader = new imageUpload_1.FileUploader();
        // Get the secure URL for each product image
        const productsWithSecureUrl = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const secureUrl = yield fileUploader.getSecureUrlFromPublicId(product.image);
            return Object.assign(Object.assign({}, product.toObject()), { image: secureUrl });
        })));
        // Return products with pagination metadata
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: {
                products: productsWithSecureUrl,
                pagination: {
                    totalProducts: totalProducts,
                    currentPage: pageNumber,
                    totalPages: Math.ceil(totalProducts / limitNumber),
                    limit: limitNumber,
                },
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductsByCategoryAndPagination = getProductsByCategoryAndPagination;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { _id, name, category, price, quantity, description, unit, currency, } = req.body;
        // const farmerId = req.user?.id;
        console.log("Updating product:", _id);
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.fieldname;
        const imagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        if (!_id ||
            !name ||
            !category ||
            !price ||
            !quantity ||
            !unit ||
            !currency ||
            !image ||
            !imagePath) {
            return res.status(400).json({ error: "Please provide all fields." });
        }
        const uploader = new imageUpload_1.FileUploader();
        const filePath = imagePath;
        const fileName = image;
        // Call the uploadFile method to get the file's secure_url and public_id
        const result = yield uploader.uploadFile({ filePath, fileName });
        const { secure_url, public_id } = result;
        if (!secure_url) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading image",
                error: secure_url,
            });
        }
        const existingCategory = yield admin_farmer_category_1.default.findById(category);
        if (!existingCategory) {
            return res
                .status(400)
                .json({ error: "The specified category does not exist." });
        }
        const updatedProduct = yield admin_farmer_product_1.default.findOneAndUpdate({
            _id: _id,
            // farmerId
        }, {
            name,
            category: existingCategory._id,
            price,
            quantity,
            description,
            image: public_id,
            unit,
            currency,
        }, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or not authorized to update." });
        }
        res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            data: Object.assign(Object.assign({}, updatedProduct.toObject()), { image: secure_url }),
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
