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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsuranceRecordStatus = exports.findInsuranceById = exports.findAllInsurances = exports.findInsurancesByFarmerId = exports.createInsuranceRecord = void 0;
const Insurance_1 = require("../models/Insurance");
const createInsuranceRecord = (insuranceData) => __awaiter(void 0, void 0, void 0, function* () {
    const insurance = new Insurance_1.Insurance(insuranceData);
    return yield insurance.save();
});
exports.createInsuranceRecord = createInsuranceRecord;
const findInsurancesByFarmerId = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Insurance_1.Insurance.find({ farmerId });
});
exports.findInsurancesByFarmerId = findInsurancesByFarmerId;
const findAllInsurances = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Insurance_1.Insurance.find().populate('farmerId', 'name email');
});
exports.findAllInsurances = findAllInsurances;
const findInsuranceById = (insuranceId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Insurance_1.Insurance.findById(insuranceId);
});
exports.findInsuranceById = findInsuranceById;
const updateInsuranceRecordStatus = (insuranceId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const insurance = yield Insurance_1.Insurance.findById(insuranceId);
    if (!insurance) {
        throw new Error('Insurance not found');
    }
    insurance.status = status;
    return yield insurance.save();
});
exports.updateInsuranceRecordStatus = updateInsuranceRecordStatus;
