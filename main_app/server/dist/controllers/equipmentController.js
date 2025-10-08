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
exports.deleteVendorEquipment = exports.updateVendorEquipment = exports.addVendorEquipment = exports.getVendorEquipments = void 0;
const equipmentService = __importStar(require("../services/equipmentService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const upload_1 = require("../middleware/upload");
const getVendorEquipments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!vendorId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
        const equipments = yield equipmentService.getEquipmentsByVendor(vendorId);
        res.status(statusCode_1.default.OK).json(equipments);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch equipments' });
    }
});
exports.getVendorEquipments = getVendorEquipments;
exports.addVendorEquipment = [
    upload_1.equipmentUpload.single('image'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!vendorId) {
                res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
                return;
            }
            const { name, quantity, price } = req.body;
            if (!name || quantity == null || price == null) {
                res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Missing required fields: name, quantity, price' });
                return;
            }
            const image = req.file ? `/uploads/equipment/${req.file.filename}` : undefined;
            const newEquipment = yield equipmentService.addEquipment(vendorId, { name, quantity, price, image });
            res.status(statusCode_1.default.CREATED).json(newEquipment);
        }
        catch (error) {
            res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to add equipment' });
        }
    })
];
exports.updateVendorEquipment = [
    upload_1.equipmentUpload.single('image'),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!vendorId) {
                res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
                return;
            }
            const { id } = req.params;
            const { name, quantity, price } = req.body;
            const updateData = {};
            if (name !== undefined)
                updateData.name = name;
            if (quantity !== undefined)
                updateData.quantity = Number(quantity);
            if (price !== undefined)
                updateData.price = Number(price);
            if (req.file)
                updateData.image = `/uploads/equipment/${req.file.filename}`;
            const updatedEquipment = yield equipmentService.updateEquipment(id, vendorId, updateData);
            if (!updatedEquipment) {
                res.status(statusCode_1.default.NOT_FOUND).json({ message: 'Equipment not found' });
                return;
            }
            res.status(statusCode_1.default.OK).json(updatedEquipment);
        }
        catch (error) {
            res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update equipment' });
        }
    })
];
const deleteVendorEquipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!vendorId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const deleted = yield equipmentService.deleteEquipment(id, vendorId);
        if (!deleted) {
            res.status(statusCode_1.default.NOT_FOUND).json({ message: 'Equipment not found' });
            return;
        }
        res.status(statusCode_1.default.OK).json({ message: 'Equipment deleted successfully' });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to delete equipment' });
    }
});
exports.deleteVendorEquipment = deleteVendorEquipment;
