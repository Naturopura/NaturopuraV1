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
exports.getDashboardStatsService = exports.createExportImport = exports.createVehicle = exports.updateShippingDetails = exports.updateShippingStatus = exports.updateArrivalStatus = exports.updateProductStatus = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const ExportImport_1 = __importDefault(require("../models/ExportImport"));
const Store_1 = __importDefault(require("../models/Store"));
const storeDao_1 = require("../dao/storeDao");
// Create a new product
const createProduct = (productData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.default(Object.assign(Object.assign({}, productData), { farmerId: userId }));
    return yield product.save();
});
exports.createProduct = createProduct;
// Update product status
const updateProductStatus = (productId, status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findOne({ _id: productId });
    if (!product) {
        return null;
    }
    product.status = status;
    yield product.save();
    return product;
});
exports.updateProductStatus = updateProductStatus;
// Update arrival status
const updateArrivalStatus = (productId, arrival_status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findOne({ _id: productId });
    if (!product) {
        return null;
    }
    product.arrival_status = arrival_status;
    if (arrival_status === "arrived") {
        product.arrivalDate = new Date();
        // Add product to store
        const store = yield Store_1.default.findOne({ managerId: userId });
        if (store) {
            yield (0, storeDao_1.addProductToStore)(store._id.toString(), productId);
        }
    }
    else {
        product.arrivalDate = null;
    }
    yield product.save();
    return product;
});
exports.updateArrivalStatus = updateArrivalStatus;
// Update shipping status
const updateShippingStatus = (productId, shipping_status, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findOne({ _id: productId });
    if (!product) {
        return null;
    }
    product.shipping_status = shipping_status;
    if (shipping_status === "shipped") {
        product.shippedDate = new Date();
    }
    else if (shipping_status === "delivered") {
        product.deliveredDate = new Date();
    }
    else {
        product.shippedDate = null;
        product.deliveredDate = null;
    }
    yield product.save();
    return product;
});
exports.updateShippingStatus = updateShippingStatus;
// Update shipping details
const updateShippingDetails = (productId, shippingDetails, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findOne({ _id: productId });
    if (!product) {
        return null;
    }
    if (shippingDetails.vehicle_number !== undefined) {
        product.vehicle_number = shippingDetails.vehicle_number;
    }
    if (shippingDetails.origin !== undefined) {
        product.origin = shippingDetails.origin;
    }
    if (shippingDetails.destination !== undefined) {
        product.destination = shippingDetails.destination;
    }
    yield product.save();
    return product;
});
exports.updateShippingDetails = updateShippingDetails;
// Create a new vehicle
const createVehicle = (vehicleData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = new Vehicle_1.default(Object.assign(Object.assign({}, vehicleData), { storeManagerId: userId }));
    return yield vehicle.save();
});
exports.createVehicle = createVehicle;
// Create export/import record
const createExportImport = (recordData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = new ExportImport_1.default(Object.assign(Object.assign({}, recordData), { storeManagerId: userId }));
    return yield record.save();
});
exports.createExportImport = createExportImport;
// Get dashboard stats
const getDashboardStatsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement logic to aggregate stats for the store manager
    // For example, count of products, vehicles, export/import counts, etc.
    // This is a placeholder implementation
    const products = yield Product_1.default.find({});
    const vehicles = yield Vehicle_1.default.find({ storeManagerId: userId });
    const exportToday = 0; // Calculate based on ExportImport records
    const importToday = 0;
    const exportMonth = 0;
    const importMonth = 0;
    const vehicleCount = vehicles.length;
    return {
        products,
        vehicles,
        exportToday,
        importToday,
        exportMonth,
        importMonth,
        vehicleCount,
    };
});
exports.getDashboardStatsService = getDashboardStatsService;
