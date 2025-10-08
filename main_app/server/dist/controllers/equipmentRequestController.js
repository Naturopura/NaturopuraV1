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
exports.createEquipmentRequest = exports.getMyRequests = void 0;
const equipmentRequestService = __importStar(require("../services/equipmentRequestService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const getMyRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const farmerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!farmerId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
        const requests = yield equipmentRequestService.getRequestsByFarmerId(farmerId);
        // Map requests to include vendor phone number only if status is approved
        const mappedRequests = requests.map(req => {
            const equipment = req.equipmentId && typeof req.equipmentId !== 'string' && 'name' in req.equipmentId ? req.equipmentId : null;
            const vendor = req.vendorId && typeof req.vendorId !== 'string' && 'name' in req.vendorId ? req.vendorId : null;
            return {
                _id: req._id,
                equipmentName: (equipment === null || equipment === void 0 ? void 0 : equipment.name) || 'Unknown',
                vendorName: (vendor === null || vendor === void 0 ? void 0 : vendor.name) || 'Unknown',
                status: req.status,
                requestedAt: req.createdAt,
                vendorPhoneNumber: req.status === 'approved' && vendor && 'phoneNumber' in vendor ? vendor.phoneNumber : undefined,
            };
        });
        res.status(statusCode_1.default.OK).json(mappedRequests);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch your equipment requests' });
    }
});
exports.getMyRequests = getMyRequests;
const createEquipmentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
        const { equipmentId, vendorId } = req.body;
        if (!equipmentId || !vendorId) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Equipment ID and Vendor ID are required' });
            return;
        }
        const newRequest = yield equipmentRequestService.createEquipmentRequest(userId, equipmentId, vendorId);
        res.status(statusCode_1.default.CREATED).json(newRequest);
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: 'Failed to create equipment request' });
    }
});
exports.createEquipmentRequest = createEquipmentRequest;
