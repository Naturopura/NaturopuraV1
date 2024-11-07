"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../environment/environment"));
const authenticateJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log("got token", token);
    if (!token) {
        res.status(401).json({ message: "Access token required" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, environment_1.default.TOKEN_SECRET);
        req.user = decoded;
        console.log("going to next", req.user);
        next();
    }
    catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.default = authenticateJWT;
