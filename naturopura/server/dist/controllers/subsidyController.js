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
exports.getAllSubsidies = exports.getFarmerSubsidies = exports.updateSubsidyStatus = exports.applySubsidy = void 0;
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const subsidyService_1 = require("../services/subsidyService");
const applySubsidy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }
        const subsidy = yield (0, subsidyService_1.applySubsidyService)(req.user._id, req.body);
        res.status(statusCode_1.default.CREATED).json({ message: 'Subsidy applied successfully', subsidy });
    }
    catch (error) {
        console.error('Error applying subsidy:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Error applying subsidy',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.applySubsidy = applySubsidy;
const updateSubsidyStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }
        const updated = yield (0, subsidyService_1.updateSubsidyStatusService)(req.params.id, req.body.status);
        if (!updated) {
            res.status(statusCode_1.default.NOT_FOUND).json({ message: 'Subsidy not found' });
            return;
        }
        res.status(statusCode_1.default.OK).json({ message: `Subsidy ${req.body.status}`, updated });
    }
    catch (error) {
        console.error('Error updating subsidy status:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Error updating status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.updateSubsidyStatus = updateSubsidyStatus;
const getFarmerSubsidies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ message: 'User not authenticated' });
            return;
        }
        const subsidies = yield (0, subsidyService_1.getFarmerSubsidiesService)(req.user._id);
        res.status(statusCode_1.default.OK).json(subsidies);
    }
    catch (error) {
        console.error('Error fetching subsidies:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching subsidies',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getFarmerSubsidies = getFarmerSubsidies;
const getAllSubsidies = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subsidies = yield (0, subsidyService_1.getAllSubsidiesService)();
        res.status(statusCode_1.default.OK).json(subsidies);
    }
    catch (error) {
        console.error('Error fetching all subsidies:', error);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            message: 'Error fetching all subsidies',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getAllSubsidies = getAllSubsidies;
