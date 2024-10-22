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
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const joi_1 = __importDefault(require("joi"));
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
const router = (0, express_1.Router)();
router.post("/admin/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, role, email, signature, isActive, isRemember, nonce, dialingCode, phone, addressLine, country, state, city, zipCode, walletAddress, } = req.body;
    const schema = joi_1.default.object({
        firstName: joi_1.default.string().min(3).max(30).required(),
        lastName: joi_1.default.string().min(3).max(30).required(),
        signature: joi_1.default.string().required(),
        nonce: joi_1.default.number(),
        isRemember: joi_1.default.boolean().truthy("true").falsy("false"),
        isActive: joi_1.default.boolean().truthy("true").falsy("false"),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        dialingCode: joi_1.default.string().min(2).required(),
        phone: joi_1.default.string().required(),
        walletAddress: joi_1.default.string().required(),
        addressLine: joi_1.default.string().required(),
        country: joi_1.default.string().required(),
        state: joi_1.default.string().required(),
        city: joi_1.default.string().required(),
        zipCode: joi_1.default.string().required(),
        role: joi_1.default.string()
            .valid("admin", "consumer", "farmer", "distributors", "consultant", "agricultural_chemicals", "equipment_manufacturers", "marketing_agencies", "insurance", "cold-storage")
            .required(),
    });
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
        return res
            .status(400)
            .json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidInput.message, responses_1.ResponseDefinitions.InvalidInput.code, error.details));
    }
    try {
        const response = yield (0, auth_1.adminSignup)(firstName, lastName, role, email, phone, isActive, nonce, signature, walletAddress, isRemember, dialingCode, addressLine, country, state, city, zipCode);
        return res.status(201).json(response);
    }
    catch (error) {
        console.error("Signup Error:", error);
        return res
            .status(500)
            .json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code));
    }
}));
router.post("/admin/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { signature, nonce, walletAddress } = req.body;
    console.log("reqBody:", req.body);
    const schema = joi_1.default.object({
        signature: joi_1.default.string().optional(),
        nonce: joi_1.default.number().optional(),
        walletAddress: joi_1.default.string().required(),
    });
    const { error } = schema.validate(req.body);
    console.log("error", error);
    console.log("Schema Validation:", schema.validate(req.body));
    if (error) {
        return res
            .status(400)
            .json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.InvalidInput.message, responses_1.ResponseDefinitions.InvalidInput.code, error.details));
    }
    try {
        const response = yield (0, auth_1.adminLogin)(signature, nonce, walletAddress);
        console.log(response);
        return res.status(200).json(response);
    }
    catch (error) {
        return res
            .status(500)
            .json(ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code));
    }
}));
exports.default = router;
