"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
// import { errorHandler } from "./error.js";
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidPassword.message, responses_1.ResponseDefinitions.InvalidPassword.code);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidPassword.message, responses_1.ResponseDefinitions.InvalidPassword.code);
        }
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
