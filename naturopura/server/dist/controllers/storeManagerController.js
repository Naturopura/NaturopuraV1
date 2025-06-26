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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.addExportImport = exports.addVehicle = exports.updateProductStatus = exports.addProduct = void 0;
const express_validator_1 = require("express-validator");
const storeManagerService = __importStar(require("../services/storeManagerService"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
    }
    if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const product = yield storeManagerService.createProduct(req.body, req.user._id);
        res.json({ success: true, product });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error adding product" });
    }
});
exports.addProduct = addProduct;
const updateProductStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
    }
    if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const updated = yield storeManagerService.updateProductStatus(req.params.id, req.body.status, req.user._id);
        if (!updated) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.json({ success: true, product: updated });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Failed to update status" });
    }
});
exports.updateProductStatus = updateProductStatus;
const addVehicle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const vehicle = yield storeManagerService.createVehicle(req.body, req.user._id);
        res.json({ success: true, vehicle });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error adding vehicle" });
    }
});
exports.addVehicle = addVehicle;
const addExportImport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const record = yield storeManagerService.createExportImport(req.body, req.user._id);
        res.json({ success: true, record });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error adding export/import record" });
    }
});
exports.addExportImport = addExportImport;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const stats = yield storeManagerService.getDashboardStatsService(req.user._id);
        res.json(stats);
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Error fetching dashboard stats" });
    }
});
exports.getDashboardStats = getDashboardStats;
