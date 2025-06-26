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
exports.getDashboardStatsService = exports.createExportImport = exports.createVehicle = exports.updateProductStatus = exports.createProduct = void 0;
const StoreProduct_1 = __importDefault(require("../models/StoreProduct"));
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const ExportImport_1 = __importDefault(require("../models/ExportImport"));
const createProduct = (data, storeManagerId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new StoreProduct_1.default(Object.assign(Object.assign({}, data), { storeManager: storeManagerId }));
    return yield product.save();
});
exports.createProduct = createProduct;
const updateProductStatus = (productId, status, storeManagerId) => __awaiter(void 0, void 0, void 0, function* () {
    const update = { status };
    if (status === "delivered") {
        update.deliveredAt = new Date();
    }
    else {
        update.deliveredAt = null;
    }
    return yield StoreProduct_1.default.findOneAndUpdate({ _id: productId, storeManager: storeManagerId }, update, { new: true });
});
exports.updateProductStatus = updateProductStatus;
const createVehicle = (data, storeManagerId) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = new Vehicle_1.default(Object.assign(Object.assign({}, data), { storeManager: storeManagerId }));
    return yield vehicle.save();
});
exports.createVehicle = createVehicle;
const createExportImport = (data, storeManagerId) => __awaiter(void 0, void 0, void 0, function* () {
    const record = new ExportImport_1.default(Object.assign(Object.assign({}, data), { storeManager: storeManagerId, date: new Date() }));
    return yield record.save();
});
exports.createExportImport = createExportImport;
const getDashboardStatsService = (storeManagerId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield StoreProduct_1.default.find({ storeManager: storeManagerId });
    const vehicles = yield Vehicle_1.default.find({ storeManager: storeManagerId });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const exportsToday = yield ExportImport_1.default.countDocuments({
        storeManager: storeManagerId,
        type: "export",
        date: { $gte: today }
    });
    const importsToday = yield ExportImport_1.default.countDocuments({
        storeManager: storeManagerId,
        type: "import",
        date: { $gte: today }
    });
    const exportsMonth = yield ExportImport_1.default.countDocuments({
        storeManager: storeManagerId,
        type: "export",
        date: { $gte: monthStart }
    });
    const importsMonth = yield ExportImport_1.default.countDocuments({
        storeManager: storeManagerId,
        type: "import",
        date: { $gte: monthStart }
    });
    return {
        products,
        vehicleCount: vehicles.length,
        vehicles, // <-- add this
        exportToday: exportsToday,
        importToday: importsToday,
        exportMonth: exportsMonth,
        importMonth: importsMonth
    };
});
exports.getDashboardStatsService = getDashboardStatsService;
