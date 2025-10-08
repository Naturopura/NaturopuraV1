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
exports.getUserSensors = exports.findSensorById = exports.createSensor = void 0;
const Sensor_1 = __importDefault(require("../models/Sensor"));
const createSensor = (sensorData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Sensor_1.default.create(sensorData);
});
exports.createSensor = createSensor;
const findSensorById = (sensorId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Sensor_1.default.findOne({ sensorId });
});
exports.findSensorById = findSensorById;
const getUserSensors = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Sensor_1.default.find({ user: userId });
});
exports.getUserSensors = getUserSensors;
