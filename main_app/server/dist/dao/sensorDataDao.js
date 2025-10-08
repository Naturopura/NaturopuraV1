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
exports.getSensorData = exports.saveSensorData = void 0;
const SensorData_1 = __importDefault(require("../models/SensorData"));
const saveSensorData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SensorData_1.default.create(data);
});
exports.saveSensorData = saveSensorData;
const getSensorData = (sensorId_1, ...args_1) => __awaiter(void 0, [sensorId_1, ...args_1], void 0, function* (sensorId, limit = 50) {
    return yield SensorData_1.default.find({ sensorId }).sort({ timestamp: -1 }).limit(limit);
});
exports.getSensorData = getSensorData;
