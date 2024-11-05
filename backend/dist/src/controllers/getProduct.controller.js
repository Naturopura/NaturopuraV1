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
function getProductsByFarmer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
                return res.status(404).json({ message: "No products found for this farmer." });
            }
            // Return the products as the response
            res.status(200).json(farmerProducts);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
exports.default = getProductsByFarmer;
