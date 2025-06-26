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
exports.getSchedulesByFarmer = exports.updateScheduleStatus = exports.getAllSchedules = exports.scheduleDroneFlight = void 0;
const droneService = __importStar(require("../services/droneService"));
const mongoose_1 = __importDefault(require("mongoose"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const scheduleDroneFlight = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { farmerId, date, fieldName, provider, currentLocation } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(farmerId)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Invalid farmerId' });
            return;
        }
        const scheduleData = {
            farmerId,
            date: new Date(date),
            fieldName,
            provider,
            currentLocation,
        };
        const schedule = yield droneService.scheduleDroneFlight(scheduleData);
        res.status(statusCode_1.default.CREATED).json(schedule);
    }
    catch (error) {
        next(error);
    }
});
exports.scheduleDroneFlight = scheduleDroneFlight;
const getAllSchedules = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield droneService.getAllSchedules();
        res.status(statusCode_1.default.OK).json(schedules);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllSchedules = getAllSchedules;
const updateScheduleStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Invalid schedule id' });
            return;
        }
        if (!['pending', 'approved', 'rejected'].includes(status)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Invalid status' });
            return;
        }
        const updatedSchedule = yield droneService.updateScheduleStatus(id, status);
        res.status(statusCode_1.default.OK).json(updatedSchedule);
    }
    catch (error) {
        next(error);
    }
});
exports.updateScheduleStatus = updateScheduleStatus;
const getSchedulesByFarmer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { farmerId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(farmerId)) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: 'Invalid farmerId' });
            return;
        }
        const schedules = yield droneService.getDroneSchedulesByFarmer(new mongoose_1.default.Types.ObjectId(farmerId));
        res.status(statusCode_1.default.OK).json(schedules);
    }
    catch (error) {
        next(error);
    }
});
exports.getSchedulesByFarmer = getSchedulesByFarmer;
