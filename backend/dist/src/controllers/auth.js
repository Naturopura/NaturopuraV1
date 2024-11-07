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
exports.adminSignup = exports.adminLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const saltRounds = 10;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const environment_1 = __importDefault(require("../environment/environment")); // Assuming you have environment setup
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = __importDefault(require("../../helper/ApiResponse"));
const responses_1 = require("../responses");
const redis_1 = require("redis");
const crypto_1 = __importDefault(require("crypto"));
const web3_1 = __importDefault(require("web3")); // Import web3.js
const web3 = new web3_1.default(); // Initialize web3 without a provider for signature verification
const redisClient = (0, redis_1.createClient)();
redisClient.on("error", (err) => console.log("Redis Client Error", err));
// Connect Redis
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        console.log("Connected to Redis");
    }
    catch (err) {
        console.error("Failed to connect to Redis:", err);
    }
}))();
const adminLogin = (signature, nonce, walletAddress) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(walletAddress, nonce, signature, "here is wallet");
    try {
        // Scenario 1: If only walletAddress is provided
        if (!signature && !nonce) {
            const user = yield admin_model_1.default.findOne({
                walletAddress,
                deletedAt: { $eq: null },
                isActive: 1,
            });
            if (!user) {
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserNotExist.message, responses_1.ResponseDefinitions.UserNotExist.code);
            }
            // Generate a random nonce
            const randomNonce = crypto_1.default.randomInt(100000, 999999); // Random 6-digit nonce
            // Store nonce in Redis with 1-minute expiration
            yield redisClient.set(walletAddress, randomNonce.toString(), { EX: 60 }); // EX sets expiration to 60 seconds
            console.log(walletAddress, "setting wallet address");
            // Send the generated nonce to the frontend
            return ApiResponse_1.default.success("Nonce generated", { nonce: randomNonce });
        }
        // Scenario 2: If signature, nonce, and walletAddress are all provided
        if (signature && nonce && walletAddress) {
            // Fetch the nonce from Redis
            const cachedNonce = yield redisClient.get(walletAddress);
            console.log(walletAddress, "got the available wallet address");
            if (!cachedNonce || cachedNonce !== nonce.toString()) {
                return ApiResponse_1.default.error("Nonce mismatch or expired", responses_1.ResponseDefinitions.SignatureError.code);
            }
            // Recreate the message that was signed by the user
            // Backend: Change message to match frontend
            const message = `Please sign this message to authenticate: ${nonce}`;
            // Message signed by the wallet
            // Verify the signature using web3.js
            const recoveredAddress = web3.eth.accounts.recover(message, signature);
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code);
            }
            // Fetch user from the database
            const user = yield admin_model_1.default.findOne({
                walletAddress,
                deletedAt: { $eq: null },
                isActive: 1,
            });
            if (!user) {
                return ApiResponse_1.default.error(responses_1.ResponseDefinitions.UserNotExist.message, responses_1.ResponseDefinitions.UserNotExist.code);
            }
            const userData = {
                isActive: user.isActive,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                email: user.email,
            };
            // Generate a JWT for the user
            const token = jsonwebtoken_1.default.sign(userData, process.env.TOKEN_SECRET || "QUOTUS", {
                expiresIn: "48h",
            });
            // Return a successful login response with the JWT token
            return ApiResponse_1.default.success(responses_1.ResponseDefinitions.OperationSuccessful.message, Object.assign({ message: "Successfully logged in.", token: token, expiresIn: "48h" }, userData), responses_1.ResponseDefinitions.OperationSuccessful.code);
        }
        // If none of the conditions match, return an invalid request response
        return ApiResponse_1.default.error("Invalid request", responses_1.ResponseDefinitions.InvalidRequest.code);
    }
    catch (error) {
        console.error("Error in adminLogin:", error);
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.InternalError.message, responses_1.ResponseDefinitions.InternalError.code);
    }
});
exports.adminLogin = adminLogin;
const adminSignup = (name, role, email, phone, isActive, nonce, signature, walletAddress, isRemember, dialingCode, addressLine, country, state, city, zipCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if email or phone already exists in the database
        const existingUser = yield admin_model_1.default.findOne({
            $or: [
                { email, deletedAt: { $eq: null } },
                { phone, deletedAt: { $eq: null } },
            ],
        });
        if (existingUser) {
            return ApiResponse_1.default.error("Email or phone number already exists", responses_1.ResponseDefinitions.InvalidInput.code);
        }
        else if (!signature ||
            typeof signature !== "string" ||
            signature.trim() === "") {
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.SignatureError.message, responses_1.ResponseDefinitions.SignatureError.code);
        }
        return yield bcryptjs_1.default
            .genSalt(saltRounds)
            .then((salt) => __awaiter(void 0, void 0, void 0, function* () {
            const hashedToken = yield bcryptjs_1.default.hash(signature, salt);
            return hashedToken;
        }))
            .then((hashedToken) => __awaiter(void 0, void 0, void 0, function* () {
            const customer = new admin_model_1.default({
                name,
                role,
                email,
                signature: hashedToken,
                isActive,
                isRemember,
                nonce,
                dialingCode,
                phone,
                addressLine,
                country,
                state,
                city,
                zipCode,
                walletAddress,
            });
            yield customer.save();
            const newCustomer = {
                id: customer._id,
                role: customer.role,
                email: customer.email,
                isRemember: customer.isRemember,
                walletAddress: customer.walletAddress,
            };
            console.log(customer._id, "gggggggg");
            const responseSuccess = ApiResponse_1.default.success(responses_1.ResponseDefinitions.OperationSuccessful.message, Object.assign(Object.assign({ createSuccessResponse: "Successfully registered.", token: isRemember
                    ? jsonwebtoken_1.default.sign(newCustomer, environment_1.default.TOKEN_SECRET, { expiresIn: "48h" })
                    : "" }, newCustomer), { expiresIn: "48h" }), responses_1.ResponseDefinitions.OperationSuccessful.code);
            return responseSuccess;
        }))
            .catch((err) => {
            console.log(err, "console");
            return ApiResponse_1.default.error(responses_1.ResponseDefinitions.HashError.message, responses_1.ResponseDefinitions.HashError.code);
        });
    }
    catch (error) {
        return ApiResponse_1.default.error(responses_1.ResponseDefinitions.NotFound.message, responses_1.ResponseDefinitions.NotFound.code);
    }
});
exports.adminSignup = adminSignup;
