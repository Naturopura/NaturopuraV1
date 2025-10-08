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
exports.detectCropHealth = void 0;
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const cropService_1 = require("../services/cropService");
const detectCropHealth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFile = req.file;
        if (!imageFile) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ error: "No image provided" });
            return;
        }
        const result = yield (0, cropService_1.detectCropIssueService)(imageFile.buffer, imageFile.mimetype);
        res.status(statusCode_1.default.OK).json(result);
    }
    catch (err) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    }
});
exports.detectCropHealth = detectCropHealth;
