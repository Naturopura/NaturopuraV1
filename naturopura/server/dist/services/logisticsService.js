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
exports.updateLogisticsStep = exports.initializeLogistics = exports.initializeLogisticsForAllProducts = exports.getLogisticsStatus = void 0;
const logisticsDao = __importStar(require("../dao/logisticsStatusDao"));
const productDao = __importStar(require("../dao/productDao"));
const socketService_1 = require("./socketService");
const mongoose_1 = __importDefault(require("mongoose"));
const getLogisticsStatus = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = yield logisticsDao.findLogisticsStatusByProductId(productId);
        if (!status) {
            // If status doesn't exist, initialize it
            yield (0, exports.initializeLogistics)(productId);
            return yield logisticsDao.findLogisticsStatusByProductId(productId);
        }
        return status;
    }
    catch (error) {
        console.error('Error getting logistics status:', error);
        throw error;
    }
});
exports.getLogisticsStatus = getLogisticsStatus;
const initializeLogisticsForAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productDao.findAllProducts();
        const purchasedProducts = products.filter(p => p.status === 'purchased');
        for (const product of purchasedProducts) {
            yield (0, exports.initializeLogistics)(product._id.toString());
        }
        return purchasedProducts.length;
    }
    catch (error) {
        console.error('Error initializing logistics for all products:', error);
        throw error;
    }
});
exports.initializeLogisticsForAllProducts = initializeLogisticsForAllProducts;
const initializeLogistics = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Convert string productId to ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(productId);
        const logistics = yield logisticsDao.createLogisticsStatus({
            productId: objectId,
            currentStep: 'collection',
            status: {
                collection: { completed: false, status: 'Pending' },
                transportation: { completed: false, status: 'Pending' },
                storage: { completed: false, status: 'Pending' },
                packaging: { completed: false, status: 'Pending' },
                delivery: { completed: false, status: 'Pending' }
            }
        });
        (0, socketService_1.updateLogisticsStatus)(productId, logistics);
        return logistics;
    }
    catch (error) {
        console.error('Error initializing logistics:', error);
        throw error;
    }
});
exports.initializeLogistics = initializeLogistics;
const updateLogisticsStep = (productId, step, stepData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // First find the logistics status
        const logistics = yield logisticsDao.findLogisticsStatusByProductId(productId);
        if (!logistics) {
            throw new Error('Logistics status not found for this product');
        }
        // Update the specific step status
        const currentStatus = logistics.status[step];
        const newStatus = Object.assign(Object.assign({}, currentStatus), stepData);
        // Update completed status based on the status enum
        if (stepData.status) {
            newStatus.completed = stepData.status === 'Completed';
        }
        logistics.status[step] = newStatus;
        // Update the current step based on completion status
        if (stepData.completed !== undefined) {
            const steps = ['collection', 'transportation', 'storage', 'packaging', 'delivery'];
            const currentStepIndex = steps.indexOf(step);
            // If step is completed and not the last step, move to next step
            if (stepData.completed && currentStepIndex < steps.length - 1) {
                logistics.currentStep = steps[currentStepIndex + 1];
            }
            // If step is uncompleted and not the first step, move back to previous step
            else if (!stepData.completed && currentStepIndex > 0) {
                logistics.currentStep = steps[currentStepIndex - 1];
            }
        }
        // Save the updated status
        yield logistics.save();
        // Update socket
        (0, socketService_1.updateLogisticsStatus)(productId, logistics);
        return logistics;
    }
    catch (error) {
        console.error('Error updating logistics status:', error);
        throw error;
    }
});
exports.updateLogisticsStep = updateLogisticsStep;
