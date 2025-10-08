"use strict";
// userController.ts
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
exports.resetPasswordController = exports.forgotPassword = exports.updateShippingAddress = exports.getShippingAddress = exports.deleteAddress = exports.updateAddress = exports.addAddress = exports.getUserAddresses = exports.updateUserProfile = exports.getFarmers = exports.checkPhoneVerification = exports.getUserProfile = exports.validateToken = exports.loginUser = exports.registerUser = exports.googleOAuthCallback = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = __importStar(require("../services/userService"));
const userDao = __importStar(require("../dao/userDao"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const passport_1 = require("../config/passport");
const googleOAuthCallback = (req, res) => {
    // @ts-ignore
    const user = req.user;
    if (!user) {
        res.status(401).json({ message: "Authentication failed" });
        return;
    }
    const token = (0, passport_1.generateJwtToken)(user);
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    // Redirect to frontend with token and role
    const redirectUrl = `${clientUrl}/oauth-callback?token=${token}&role=${user.role}`;
    res.redirect(redirectUrl);
};
exports.googleOAuthCallback = googleOAuthCallback;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, name, email, location, phoneNumber } = req.body;
        if (role === "vendor") {
            if (!name || !email || !phoneNumber) {
                res.status(statusCode_1.default.BAD_REQUEST).json({
                    message: "Missing required fields for vendor registration: name, email, phoneNumber",
                });
                return;
            }
        }
        const user = yield userService.createUser(req.body);
        res.status(statusCode_1.default.CREATED).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            aadhaarNumber: user.aadhaarNumber,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.BAD_REQUEST).json({
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const redirectToken = req.query.token;
        // Step 1: Authenticate user
        const { token, user } = yield userService.authenticateUser(email, password);
        const typedUser = user;
        // Step 2: If redirect token is passed, verify it
        if (redirectToken) {
            try {
                const decoded = jsonwebtoken_1.default.verify(redirectToken, process.env.JWT_SECRET);
                if (decoded.email !== typedUser.email ||
                    decoded._id.toString() !== typedUser._id.toString()) {
                    res.status(401).json({ message: "Unauthorized access: Token mismatch" });
                    return;
                }
            }
            catch (err) {
                res.status(401).json({ message: "Invalid token" });
                return;
            }
        }
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Login failed",
        });
    }
});
exports.loginUser = loginUser;
const validateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res
                .status(statusCode_1.default.UNAUTHORIZED)
                .json({ success: false, message: "Invalid token" });
            return;
        }
        const user = yield userService.findUserById(req.user._id);
        if (!user) {
            res
                .status(statusCode_1.default.NOT_FOUND)
                .json({ success: false, message: "User not found" });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                kyc: user.kyc,
            },
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
});
exports.validateToken = validateToken;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res
                .status(statusCode_1.default.UNAUTHORIZED)
                .json({ success: false, message: "Unauthorized" });
            return;
        }
        const user = yield userService.findUserById(req.user._id);
        if (!user) {
            res
                .status(statusCode_1.default.NOT_FOUND)
                .json({ success: false, message: "User not found" });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                kyc: user.kyc, // <-- ADDED THIS LINE
            },
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
});
exports.getUserProfile = getUserProfile;
const checkPhoneVerification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res
                .status(statusCode_1.default.UNAUTHORIZED)
                .json({ success: false, message: "Not authenticated" });
            return;
        }
        const result = yield userService.getPhoneVerification(req.user._id);
        res.status(statusCode_1.default.OK).json(Object.assign({ success: true }, result));
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Phone verification failed",
        });
    }
});
exports.checkPhoneVerification = checkPhoneVerification;
const getFarmers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const farmers = yield userService.getAllFarmers();
        res.status(statusCode_1.default.OK).json({
            success: true,
            count: farmers.length,
            data: farmers.map((f) => ({
                id: f._id,
                name: f.name,
                email: f.email,
                phoneNumber: f.phoneNumber,
                addresses: f.addresses,
                farmSize: f.farmSize,
                cropTypes: f.cropTypes,
                location: f.location,
                kyc: f.kyc,
                createdAt: f.createdAt,
            })),
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Could not fetch farmers",
        });
    }
});
exports.getFarmers = getFarmers;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Use only authenticated user's ID for update, ignore any userId in body for security
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { phoneNumber, email, name } = req.body;
        const updatedUser = yield userService.updateUser(userId, req.body);
        res.status(200).json({ success: true, user: updatedUser });
    }
    catch (error) {
        res
            .status(500)
            .json({
            success: false,
            message: error instanceof Error ? error.message : "Update failed",
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const getUserAddresses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user.addresses || [],
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to get addresses",
        });
    }
});
exports.getUserAddresses = getUserAddresses;
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const { address, isDefault } = req.body;
        const user = yield userService.findUserById(userId);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const newAddress = Object.assign(Object.assign({}, address), { isDefault: isDefault || false, createdAt: new Date() });
        if (isDefault) {
            // Set all other addresses to not default
            user.addresses =
                ((_b = user.addresses) === null || _b === void 0 ? void 0 : _b.map((addr) => (Object.assign(Object.assign({}, addr), { isDefault: false })))) || [];
        }
        // First update the user with the new address
        yield userDao.updateUserById(userId, {
            addresses: [...(user.addresses || []), newAddress],
        });
        // Then get the fresh user data to ensure we have the latest addresses
        const updatedUser = yield userDao.findUserById(userId);
        if (!updatedUser) {
            throw new Error("User not found after update");
        }
        res.status(statusCode_1.default.CREATED).json({
            success: true,
            data: {
                newAddress,
                addresses: updatedUser.addresses,
            },
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error adding address",
        });
    }
});
exports.addAddress = addAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const addressId = req.params.addressId;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const { address, isDefault } = req.body;
        const user = yield userService.findUserById(userId);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const addressIndex = (_b = user.addresses) === null || _b === void 0 ? void 0 : _b.findIndex((addr) => addr._id.toString() === addressId);
        if (addressIndex === -1) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "Address not found",
            });
            return;
        }
        const updatedAddress = Object.assign(Object.assign(Object.assign({}, user.addresses[addressIndex]), address), { isDefault: isDefault || false, updatedAt: new Date() });
        if (isDefault) {
            // Set all other addresses to not default
            user.addresses =
                ((_c = user.addresses) === null || _c === void 0 ? void 0 : _c.map((addr) => (Object.assign(Object.assign({}, addr), { isDefault: addr._id.toString() === addressId })))) || [];
        }
        user.addresses[addressIndex] = updatedAddress;
        yield user.save();
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: updatedAddress,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating address",
        });
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const addressId = req.params.addressId;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const user = yield userService.findUserById(userId); // DO NOT use .lean() here!
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
        yield user.save();
        res
            .status(200)
            .json({
            success: true,
            message: "Address deleted",
            addresses: user.addresses,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting address",
        });
    }
});
exports.deleteAddress = deleteAddress;
const getShippingAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        const defaultAddress = (_b = user.addresses) === null || _b === void 0 ? void 0 : _b.find((addr) => addr.isDefault);
        res.status(statusCode_1.default.OK).json({
            success: true,
            data: defaultAddress || null,
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error fetching shipping address",
        });
    }
});
exports.getShippingAddress = getShippingAddress;
const updateShippingAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = req.user;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!userId) {
            res.status(statusCode_1.default.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }
        const { address } = req.body;
        if (!address) {
            res.status(statusCode_1.default.BAD_REQUEST).json({
                success: false,
                message: "Address is required",
            });
            return;
        }
        // Update addresses array with the new default address
        const updatedUser = yield userService.updateUser(userId, {
            addresses: [
                ...(((_b = user.addresses) === null || _b === void 0 ? void 0 : _b.filter((addr) => !addr.isDefault)) || []),
                Object.assign(Object.assign({}, address), { isDefault: true, updatedAt: new Date() }),
            ],
        });
        if (!updatedUser) {
            res.status(statusCode_1.default.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(statusCode_1.default.OK).json({
            success: true,
            message: "Shipping address updated successfully",
            data: updatedUser.addresses.find((addr) => addr.isDefault),
        });
    }
    catch (error) {
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating shipping address",
        });
    }
});
exports.updateShippingAddress = updateShippingAddress;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        yield userService.sendResetPasswordEmail(email);
        res.status(200).json({ message: "Password reset email sent!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.forgotPassword = forgotPassword;
const resetPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        yield userService.resetPassword(token, password);
        res.status(200).json({ message: "Password reset successful!" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.resetPasswordController = resetPasswordController;
