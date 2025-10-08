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
exports.getPricePredictions = exports.deleteProductById = exports.updateProductById = exports.createNewProduct = exports.fetchProductsByCategory = exports.fetchProductById = exports.fetchAllProducts = void 0;
const productDao = __importStar(require("../dao/productDao"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fetchAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productDao.findAllProducts();
});
exports.fetchAllProducts = fetchAllProducts;
const fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productDao.findProductById(id);
});
exports.fetchProductById = fetchProductById;
const fetchProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productDao.findProductsByCategory(category);
});
exports.fetchProductsByCategory = fetchProductsByCategory;
const createNewProduct = (body, userId, files) => __awaiter(void 0, void 0, void 0, function* () {
    const imagePaths = (files === null || files === void 0 ? void 0 : files.map((file) => `/uploads/products/${file.filename}`)) || [];
    return yield productDao.createProductRecord(Object.assign(Object.assign({}, body), { price: Number(body.price), quantity: Number(body.quantity), farmerId: userId, images: imagePaths, status: 'available' }));
});
exports.createNewProduct = createNewProduct;
const updateProductById = (productId, body, userId, files) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productDao.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    // Fix authorization check to handle populated farmerId object
    const farmerIdStr = typeof product.farmerId === 'object' && product.farmerId !== null && '_id' in product.farmerId
        ? String(product.farmerId._id)
        : String(product.farmerId);
    if (farmerIdStr !== userId) {
        throw new Error('Not authorized');
    }
    let updatedImages = [...product.images];
    if (files === null || files === void 0 ? void 0 : files.length) {
        const newImages = files.map(file => `/uploads/products/${file.filename}`);
        const keepImages = body.keepImages ? JSON.parse(body.keepImages) : [];
        if (keepImages.length) {
            updatedImages = [...keepImages, ...newImages];
        }
        else {
            product.images.forEach(img => {
                const filePath = path_1.default.join(__dirname, '../../uploads/products', path_1.default.basename(img));
                if (fs_1.default.existsSync(filePath))
                    fs_1.default.unlinkSync(filePath);
            });
            updatedImages = newImages;
        }
    }
    const updatedProduct = yield productDao.updateProductById(productId, Object.assign(Object.assign({}, body), { price: Number(body.price), quantity: Number(body.quantity), images: updatedImages }));
    if (!updatedProduct) {
        throw new Error('Product update failed');
    }
    return updatedProduct;
});
exports.updateProductById = updateProductById;
const deleteProductById = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productDao.findProductById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    // Fix authorization check to handle populated farmerId object
    const farmerIdStr = typeof product.farmerId === 'object' && product.farmerId !== null && '_id' in product.farmerId
        ? String(product.farmerId._id)
        : String(product.farmerId);
    if (farmerIdStr !== userId) {
        throw new Error('Not authorized');
    }
    product.images.forEach(img => {
        const filePath = path_1.default.join(__dirname, '../../uploads/products', path_1.default.basename(img));
        if (fs_1.default.existsSync(filePath))
            fs_1.default.unlinkSync(filePath);
    });
    yield productDao.deleteProductById(productId);
});
exports.deleteProductById = deleteProductById;
const getPricePredictions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield axios_1.default.get('https://serpapi.com/search.json', {
        params: {
            engine: 'google_shopping',
            q: query,
            gl: 'in',
            hl: 'en',
            api_key: process.env.SERP_API_KEY,
            num: 5
        }
    });
    if (!((_a = response.data) === null || _a === void 0 ? void 0 : _a.shopping_results))
        throw new Error('Invalid SERP response');
    return response.data.shopping_results
        .filter((item) => typeof item.price === 'string')
        .map((item) => ({
        title: item.title || 'Unknown Product',
        price: item.price.replace(/[^0-9,.]/g, ''),
        source: item.source || 'Unknown Source'
    }))
        .slice(0, 5);
});
exports.getPricePredictions = getPricePredictions;
