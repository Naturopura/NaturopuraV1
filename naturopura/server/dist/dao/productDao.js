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
exports.deleteProductById = exports.updateProductById = exports.createProductRecord = exports.findProductById = exports.findAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const findAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.find().populate('farmerId', 'name email').sort({ createdAt: -1 });
});
exports.findAllProducts = findAllProducts;
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findById(id).populate('farmerId', 'name email');
});
exports.findProductById = findProductById;
const createProductRecord = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.default(productData);
    return yield product.save();
});
exports.createProductRecord = createProductRecord;
const updateProductById = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findByIdAndUpdate(productId, updateData, { new: true, runValidators: true }).populate('farmerId', 'name email');
});
exports.updateProductById = updateProductById;
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Product_1.default.findByIdAndDelete(productId);
});
exports.deleteProductById = deleteProductById;
