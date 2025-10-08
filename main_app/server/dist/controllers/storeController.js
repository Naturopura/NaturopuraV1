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
exports.deleteStore = exports.updateStore = exports.getStores = exports.getStore = exports.createStore = void 0;
const storeService = __importStar(require("../services/storeService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const storeData = req.body;
        storeData.managerId = req.user._id;
        const store = yield storeService.createNewStore(storeData);
        res.status(statusCode_1.default.CREATED).json({ success: true, data: store });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.createStore = createStore;
const getStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = yield storeService.getStoreById(req.params.id);
        if (!store) {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Store not found' });
            return;
        }
        res.status(statusCode_1.default.OK).json(store);
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.getStore = getStore;
const getStores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stores = yield storeService.getAllStores();
        res.status(statusCode_1.default.OK).json(stores);
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.getStores = getStores;
const updateStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        const updatedStore = yield storeService.updateStore(req.params.id, req.body);
        if (!updatedStore) {
            res.status(statusCode_1.default.NOT_FOUND).json({ success: false, message: 'Store not found' });
            return;
        }
        res.status(statusCode_1.default.OK).json({ success: true, data: updatedStore });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.updateStore = updateStore;
const deleteStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({ success: false, message: 'Unauthorized' });
            return;
        }
        yield storeService.deleteStore(req.params.id);
        res.status(statusCode_1.default.OK).json({ success: true, message: 'Store deleted successfully' });
    }
    catch (error) {
        const err = error instanceof Error ? error.message : 'Something went wrong';
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ success: false, message: err });
    }
});
exports.deleteStore = deleteStore;
