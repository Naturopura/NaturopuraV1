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
exports.clearUserMessages = exports.getAiResponse = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const aiDao_1 = require("../dao/aiDao");
const getAiResponse = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
        throw new Error('Missing Gemini API Key');
    // **CORRECTION HERE:**
    // The 'modelName' already includes 'models/', so remove 'models/' from the URL base.
    // Use the specific model name you found from the 'ListModels' call, e.g., 'models/gemini-1.0-pro'
    const modelName = 'models/gemini-2.5-pro'; // Or 'models/gemini-1.5-flash', 'models/gemini-1.0-pro-001', etc.
    // Correct URL construction:
    const url = `https://generativelanguage.googleapis.com/v1/${modelName}:generateContent?key=${apiKey}`;
    const response = yield (0, node_fetch_1.default)(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        }),
    });
    // Always check response.ok first before trying to parse JSON
    // This helps catch non-JSON error responses gracefully
    if (!response.ok) {
        let errorData;
        try {
            errorData = yield response.json(); // Try to parse JSON for detailed error
        }
        catch (e) {
            // If it's not JSON, just get the text or status
            const errorText = yield response.text();
            console.error(`❌ Gemini API Error (Non-JSON): Status ${response.status}, Text: ${errorText}`);
            throw new Error(`Gemini API call failed with status ${response.status}: ${errorText.substring(0, 200)}...`);
        }
        console.error('❌ Gemini API Error:', errorData);
        throw new Error(((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) || `Gemini API call failed with status ${response.status}`);
    }
    const data = yield response.json();
    const reply = (_f = (_e = (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.candidates) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.parts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.text;
    return reply || 'No response from Gemini';
});
exports.getAiResponse = getAiResponse;
const clearUserMessages = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, aiDao_1.deleteMessagesByUser)(userId);
});
exports.clearUserMessages = clearUserMessages;
