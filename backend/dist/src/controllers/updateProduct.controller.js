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
const admin_farmer_model_1 = __importDefault(require("../models/admin.farmer.model"));
function updateProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract productId and the updated fields from the request body
            const { productId, farmerId, name, category, price, quantity, description, image, unit } = req.body;
            console.log("Updating product:", productId);
            // Ensure productId and farmerId are provided
            if (!productId || !farmerId) {
                return res.status(400).json({ error: "Please provide both productId and farmerId." });
            }
            // Locate and update the product using productId and farmerId
            const updatedProduct = yield admin_farmer_model_1.default.findOneAndUpdate({ _id: productId, farmerId }, // Ensure the product belongs to the farmer
            { name, category, price, quantity, description, image, unit }, // Fields to update
            { new: true, runValidators: true } // Options: return the updated document and run validators
            );
            // Check if the product was found and updated
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found or not authorized to update." });
            }
            // Return the updated product as the response
            res.status(200).json(updatedProduct);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = updateProduct;
