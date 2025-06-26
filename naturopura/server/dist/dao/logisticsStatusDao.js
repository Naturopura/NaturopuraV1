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
exports.findAllLogisticsStatuses = exports.updateLogisticsStatus = exports.createLogisticsStatus = exports.findLogisticsStatusByProductId = void 0;
const LogisticsStatus_1 = __importDefault(require("../models/LogisticsStatus"));
const findLogisticsStatusByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield LogisticsStatus_1.default.findOne({ productId });
});
exports.findLogisticsStatusByProductId = findLogisticsStatusByProductId;
const createLogisticsStatus = (logisticsData) => __awaiter(void 0, void 0, void 0, function* () {
    const logistics = new LogisticsStatus_1.default(logisticsData);
    return yield logistics.save();
});
exports.createLogisticsStatus = createLogisticsStatus;
const updateLogisticsStatus = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const logistics = yield LogisticsStatus_1.default.findOne({ productId });
    if (!logistics) {
        throw new Error('Logistics status not found');
    }
    Object.assign(logistics, updateData);
    return yield logistics.save();
});
exports.updateLogisticsStatus = updateLogisticsStatus;
const findAllLogisticsStatuses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield LogisticsStatus_1.default.find();
});
exports.findAllLogisticsStatuses = findAllLogisticsStatuses;
