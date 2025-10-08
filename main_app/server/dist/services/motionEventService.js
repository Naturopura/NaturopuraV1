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
exports.getAllMotionEventsService = exports.createMotionEventService = void 0;
const path_1 = __importDefault(require("path"));
const motionEventDao = __importStar(require("../dao/motionEventDao"));
const vision_1 = require("@google-cloud/vision");
const keyPath = path_1.default.resolve(__dirname, '../visionapi/crucial-raceway-459108-k2-efcf8535a54d.json');
const client = new vision_1.ImageAnnotatorClient({
    keyFilename: keyPath,
});
const createMotionEventService = (photoBuffer, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse timestamp or use current time
    let parsedTimestamp;
    if (timestamp) {
        parsedTimestamp = new Date(timestamp);
        if (isNaN(parsedTimestamp.getTime())) {
            throw new Error('Invalid timestamp format. Use ISO format (e.g., 2025-05-05T10:00:00.000Z)');
        }
    }
    else {
        parsedTimestamp = new Date();
    }
    if (!client.objectLocalization) {
        throw new Error('Object localization method not available');
    }
    const [result] = yield client.objectLocalization({
        image: { content: photoBuffer }
    });
    if (!result.localizedObjectAnnotations) {
        throw new Error('No object annotations found');
    }
    const detectedObjects = result.localizedObjectAnnotations.map((object) => {
        var _a, _b, _c, _d, _e;
        return ({
            label: (_a = object.name) !== null && _a !== void 0 ? _a : '',
            confidence: (_b = object.score) !== null && _b !== void 0 ? _b : 0,
            boundingBox: (_e = (_d = (_c = object.boundingPoly) === null || _c === void 0 ? void 0 : _c.normalizedVertices) === null || _d === void 0 ? void 0 : _d.map((v) => { var _a, _b; return [(_a = v.x) !== null && _a !== void 0 ? _a : 0, (_b = v.y) !== null && _b !== void 0 ? _b : 0]; })) !== null && _e !== void 0 ? _e : [],
        });
    });
    const newEvent = yield motionEventDao.createMotionEventRecord({
        timestamp: parsedTimestamp,
        photo: photoBuffer,
        detectedObjects,
    });
    return { detectedObjects };
});
exports.createMotionEventService = createMotionEventService;
const getAllMotionEventsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield motionEventDao.findAllMotionEvents();
    return events.map((event) => ({
        _id: event._id,
        timestamp: event.timestamp.toISOString(),
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        photo: event.photo,
        detectedObjects: event.detectedObjects,
    }));
});
exports.getAllMotionEventsService = getAllMotionEventsService;
