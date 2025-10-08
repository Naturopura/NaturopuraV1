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
exports.getRequestsByFarmerId = exports.updateEquipmentRequestStatus = exports.getAllEquipmentRequests = exports.createEquipmentRequest = void 0;
const EquipmentRequest_1 = __importDefault(require("../models/EquipmentRequest"));
const createEquipmentRequest = (farmerId, equipmentId, vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const newRequest = new EquipmentRequest_1.default({
        farmerId,
        equipmentId,
        vendorId,
        status: 'pending'
    });
    return yield newRequest.save();
});
exports.createEquipmentRequest = createEquipmentRequest;
const getAllEquipmentRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield EquipmentRequest_1.default.find()
        .populate('equipmentId')
        .populate('farmerId')
        .populate({ path: 'vendorId', select: 'name phoneNumber' })
        .exec();
});
exports.getAllEquipmentRequests = getAllEquipmentRequests;
const updateEquipmentRequestStatus = (requestId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield EquipmentRequest_1.default.findById(requestId);
    if (!request) {
        throw new Error('Request not found');
    }
    request.status = status;
    return yield request.save();
});
exports.updateEquipmentRequestStatus = updateEquipmentRequestStatus;
const getRequestsByFarmerId = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield EquipmentRequest_1.default.find({ farmerId })
        .populate('equipmentId')
        .populate({ path: 'vendorId', select: 'name phoneNumber' })
        .exec();
});
exports.getRequestsByFarmerId = getRequestsByFarmerId;
