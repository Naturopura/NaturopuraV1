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
function deleteProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract productId and farmerId from the request body
            const { productId, farmerId } = req.body;
            console.log("Deleting product:", productId);
            // Ensure productId and farmerId are provided
            if (!productId || !farmerId) {
                return res.status(400).json({ error: "Please provide both productId and farmerId." });
            }
            // Find and delete the product by productId and farmerId
            const deletedProduct = yield admin_farmer_model_1.default.findOneAndDelete({ _id: productId, farmerId });
            // Check if the product was found and deleted
            if (!deletedProduct) {
                return res.status(404).json({ message: "Product not found or not authorized to delete." });
            }
            // Return success message as the response
            res.status(200).json({ message: "Product deleted successfully", deletedProduct });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = deleteProduct;
