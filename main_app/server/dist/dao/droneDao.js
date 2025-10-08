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
exports.updateScheduleStatus = exports.getSchedulesByFarmer = exports.getScheduleById = exports.getAllSchedules = exports.createSchedule = void 0;
const DroneSchedule_1 = __importDefault(require("../models/DroneSchedule"));
const createSchedule = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = new DroneSchedule_1.default({
        farmerId: scheduleData.farmerId,
        date: scheduleData.date,
        fieldName: scheduleData.fieldName,
        provider: scheduleData.provider,
        currentLocation: scheduleData.currentLocation,
    });
    return yield schedule.save();
});
exports.createSchedule = createSchedule;
const getAllSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield DroneSchedule_1.default.find().sort({ createdAt: -1 });
});
exports.getAllSchedules = getAllSchedules;
const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield DroneSchedule_1.default.findById(id);
});
exports.getScheduleById = getScheduleById;
const getSchedulesByFarmer = (farmerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield DroneSchedule_1.default.find({ farmerId });
});
exports.getSchedulesByFarmer = getSchedulesByFarmer;
const updateScheduleStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    return yield DroneSchedule_1.default.findByIdAndUpdate(id, { status }, { new: true });
});
exports.updateScheduleStatus = updateScheduleStatus;
