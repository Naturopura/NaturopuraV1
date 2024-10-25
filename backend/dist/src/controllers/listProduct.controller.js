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
const admin_farmer_model_1 = __importDefault(require("../models/admin.farmer.model")); // Adjust this import based on your structure
function listProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract data from the request body
            const { farmerId, name, category, price, quantity, description, image } = req.body;
            console.log("got the request", farmerId);
            // Ensure all required fields are provided
            if (!farmerId || !name || !category || !price || !quantity || !image) {
                return res.status(400).json({ error: "Please provide all required fields: farmerId, name, category, price, quantity, and image." });
            }
            // Create a new product using the Product model
            const newProduct = new admin_farmer_model_1.default({
                farmerId,
                name,
                category,
                price,
                quantity,
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
}
exports.default = listProduct;
