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
exports.getRequestStatuses = exports.getAllEquipments = exports.searchEquipments = void 0;
const equipmentService = __importStar(require("../services/equipmentService"));
const equipmentRequestService = __importStar(require("../services/equipmentRequestService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const searchEquipments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        if (!search || typeof search !== 'string') {
            const equipments = yield equipmentService.getAllEquipments(); // Fetch all equipments
            res.status(statusCode_1.default.OK).json(equipments);
            return;
        }
        let equipments = yield equipmentService.searchEquipments(search);
        equipments = equipments.map(equipment => equipment.toObject());
        console.log('Equipments returned from searchEquipments:', equipments);
        res.status(statusCode_1.default.OK).json(equipments);
    }
    catch (error) {
        console.error('Error in searchEquipments controller:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to search equipments' });
    }
});
exports.searchEquipments = searchEquipments;
const getAllEquipments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Get vendor ID from authenticated user
        console.log('Authenticated vendor ID:', vendorId); // Log the vendor ID
        if (!vendorId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
        // Fetch all equipments and populate vendor info
        let equipments = yield equipmentService.getAllEquipments();
        // Populate vendor info for each equipment
        equipments = yield Promise.all(equipments.map((eq) => __awaiter(void 0, void 0, void 0, function* () {
            const populatedEq = yield eq.populate({
                path: 'vendorId',
                select: 'name phoneNumber',
                model: 'User'
            });
            return populatedEq.toObject();
        })));
        res.status(statusCode_1.default.OK).json(equipments);
    }
    catch (error) {
        console.error('Error in getAllEquipments controller:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch equipments' });
    }
});
exports.getAllEquipments = getAllEquipments;
const getRequestStatuses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { equipmentIds } = req.body;
        if (!farmerId || !Array.isArray(equipmentIds)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Invalid request' });
            return;
        }
        const allRequests = yield equipmentRequestService.getAllEquipmentRequests();
        // Filter requests for this farmer and equipmentIds
        const filteredRequests = allRequests.filter(req => req.farmerId.toString() === farmerId.toString() &&
            equipmentIds.includes(req.equipmentId.toString()));
        // Map equipmentId to request status and vendor phone number if approved
        const response = filteredRequests.map(req => ({
            equipmentId: req.equipmentId.toString(),
            status: req.status,
            vendor: req.vendorId && typeof req.vendorId !== 'string' && 'name' in req.vendorId && 'phoneNumber' in req.vendorId
                ? { name: req.vendorId.name, phoneNumber: req.vendorId.phoneNumber }
                : null,
        }));
        res.status(statusCode_1.default.OK).json(response);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get request statuses' });
    }
});
exports.getRequestStatuses = getRequestStatuses;
