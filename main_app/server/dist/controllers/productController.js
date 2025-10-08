"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.predictPrice = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByCategory = exports.getProductById = exports.getProducts = void 0;
const productService = __importStar(require("../services/productService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const productDao_1 = require("../dao/productDao");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.fetchAllProducts();
        res.status(statusCode_1.default.OK).json(products);
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productService.fetchProductById(req.params.id);
        if (!product) {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Product not found' });
            return;
        }
        res.status(statusCode_1.default.OK).json(product);
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.getProductById = getProductById;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const products = yield (0, productDao_1.findProductsByCategory)(slug);
        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found for this category" });
            return;
        }
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const product = yield productService.createNewProduct(req.body, req.user._id, req.files);
        res.status(statusCode_1.default.CREATED).json({ success: true, data: product });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const updatedProduct = yield productService.updateProductById(req.params.id, req.body, req.user._id, req.files);
        res.status(statusCode_1.default.OK).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        const errMsg = error instanceof Error ? error.message : '';
        const status = errMsg === 'Product not found'
            ? statusCode_1.default.NOT_FOUND
            : errMsg === 'Not authorized'
                ? statusCode_1.default.FORBIDDEN
                : statusCode_1.default.BAD_REQUEST;
        res.status(status).json({ success: false, message: errMsg || 'Something went wrong' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        yield productService.deleteProductById(req.params.id, req.user._id);
        res.status(statusCode_1.default.OK).json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        const errMsg = error instanceof Error ? error.message : '';
        const status = errMsg === 'Product not found'
            ? statusCode_1.default.NOT_FOUND
            : errMsg === 'Not authorized'
                ? statusCode_1.default.FORBIDDEN
                : statusCode_1.default.INTERNAL_SERVER_ERROR;
        res.status(status).json({ success: false, message: errMsg || 'Something went wrong' });
    }
});
exports.deleteProduct = deleteProduct;
const predictPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            res.status(statusCode_1.default.BAD_REQUEST).json({ success: false, message: 'Query parameter is required' });
            return;
        }
        const predictions = yield productService.getPricePredictions(q);
        res.status(statusCode_1.default.OK).json({ success: true, predictions, query: q });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.predictPrice = predictPrice;
