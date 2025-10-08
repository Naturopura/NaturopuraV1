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
exports.searchEquipments = exports.addEquipment = exports.getEquipmentsByVendor = void 0;
const Equipment_1 = __importDefault(require("../models/Equipment"));
const getEquipmentsByVendor = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Equipment_1.default.find({ vendorId });
});
exports.getEquipmentsByVendor = getEquipmentsByVendor;
const addEquipment = (vendorId, equipmentData) => __awaiter(void 0, void 0, void 0, function* () {
    const newEquipment = new Equipment_1.default(Object.assign(Object.assign({}, equipmentData), { vendorId }));
    return yield newEquipment.save();
});
exports.addEquipment = addEquipment;
const searchEquipments = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Equipment_1.default.find({ name: { $regex: searchTerm, $options: 'i' } }).populate({
        path: 'vendorId',
        select: 'name phoneNumber',
        model: 'User'
    });
});
exports.searchEquipments = searchEquipments;
