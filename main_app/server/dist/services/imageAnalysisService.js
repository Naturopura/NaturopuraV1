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
exports.analyzeImage = void 0;
const path_1 = __importDefault(require("path"));
const keyPath = path_1.default.resolve(__dirname, '../visionapi/crucial-raceway-459108-k2-efcf8535a54d.json');
const vision_1 = __importDefault(require("@google-cloud/vision"));
const client = new vision_1.default.ImageAnnotatorClient({
    keyFilename: keyPath,
});
const analyzeImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield client.labelDetection(filePath);
        const labels = result.labelAnnotations;
        if (!labels || labels.length === 0) {
            return 'No significant features detected in the image.';
        }
        const descriptions = labels.map(label => label.description).join(', ');
        return `🖼️ AI analyzed image and detected: ${descriptions}.`;
    }
    catch (error) {
        console.error('Error analyzing image:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        }
        throw new Error('Image analysis failed');
    }
});
exports.analyzeImage = analyzeImage;
