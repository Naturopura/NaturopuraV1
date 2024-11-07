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
exports.deleteProduct = exports.updateProduct = exports.getProductsByFarmer = exports.listProduct = void 0;
const admin_farmer_model_1 = __importDefault(require("../models/admin.farmer.model"));
const listProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from the request body
        const { farmerId, name, category, price, quantity, description, image, unit, } = req.body;
        console.log("Received request to list product for farmer:", farmerId);
        // Ensure all required fields are provided
        if (!farmerId ||
            !name ||
            !category ||
            !price ||
            !quantity ||
            !image ||
            !unit) {
            return res.status(400).json({
                error: "Please provide all required fields: farmerId, name, category, price, quantity, and image.",
            });
        }
        // Check if the farmer exists
        const farmerExists = yield admin_farmer_model_1.default.findById(farmerId);
        if (!farmerExists) {
            return res.status(404).json({ error: "Farmer does not exist." });
        }
        // Create a new product using the Product model
        const newProduct = new admin_farmer_model_1.default({
            farmerId,
            name,
            category,
            price,
            quantity,
            unit,
            description,
            image, // Assuming image is being sent as Buffer in the request body
        });
        // Save the product to the database
        const savedProduct = yield newProduct.save();
        // Return the saved product as the response
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.listProduct = listProduct;
const getProductsByFarmer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract farmerId from the request body
        const { farmerId } = req.body;
        console.log("Fetching products for farmer:", farmerId);
        // Ensure farmerId is provided
        if (!farmerId) {
            return res.status(400).json({ error: "Please provide the farmerId." });
        }
        // Retrieve all products listed by the farmer
        const farmerProducts = yield admin_farmer_model_1.default.find({ farmerId });
        // Check if any products are found
        if (farmerProducts.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found for this farmer." });
        }
        // Return the products as the response
        res.status(200).json(farmerProducts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getProductsByFarmer = getProductsByFarmer;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract productId and the updated fields from the request body
        const { productId, farmerId, name, category, price, quantity, description, image, unit, } = req.body;
        console.log("Updating product:", productId);
        // Ensure productId and farmerId are provided
        if (!productId || !farmerId) {
            return res
                .status(400)
                .json({ error: "Please provide both productId and farmerId." });
        }
        // Locate and update the product using productId and farmerId
        const updatedProduct = yield admin_farmer_model_1.default.findOneAndUpdate({ _id: productId, farmerId }, // Ensure the product belongs to the farmer
        { name, category, price, quantity, description, image, unit }, // Fields to update
        { new: true, runValidators: true } // Options: return the updated document and run validators
        );
        // Check if the product was found and updated
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or not authorized to update." });
        }
        // Return the updated product as the response
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract productId and farmerId from the request body
        const { productId, farmerId } = req.body;
        console.log("Deleting product:", productId);
        // Ensure productId and farmerId are provided
        if (!productId || !farmerId) {
            return res
                .status(400)
                .json({ error: "Please provide both productId and farmerId." });
        }
        // Find and delete the product by productId and farmerId
        const deletedProduct = yield admin_farmer_model_1.default.findOneAndDelete({
            _id: productId,
            farmerId,
        });
        // Check if the product was found and deleted
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ message: "Product not found or not authorized to delete." });
        }
        // Return success message as the response
        res
            .status(200)
            .json({ message: "Product deleted successfully", deletedProduct });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
