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
exports.resetPassword = exports.sendResetPasswordEmail = exports.getAllFarmers = exports.getPhoneVerification = exports.findUserById = exports.authenticateUser = exports.updateUser = exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = require("crypto");
const userDao = __importStar(require("../dao/userDao"));
const emailService_1 = require("../utils/emailService");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield userDao.findUserByField('email', userData.email);
    if (existingUser)
        throw new Error('User already exists');
    if (userData.role !== 'delivery_partner' && userData.role !== 'vendor' && userData.aadhaarNumber) {
        const existingAadhaar = yield userDao.findUserByField('aadhaarNumber', userData.aadhaarNumber);
        if (existingAadhaar)
            throw new Error('Aadhaar already registered');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
    const newUserData = Object.assign(Object.assign({}, userData), { password: hashedPassword });
    // Set only the relevant approval status
    if (userData.role === 'delivery_partner') {
        newUserData.deliveryPartnerApprovalStatus = 'pending';
        // Ensure storeManagerApprovalStatus and vendorApprovalStatus are not set
        delete newUserData.storeManagerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    }
    else if (userData.role === 'store_manager') {
        newUserData.storeManagerApprovalStatus = 'pending';
        // Ensure deliveryPartnerApprovalStatus and vendorApprovalStatus are not set
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    }
    else if (userData.role === 'vendor') {
        newUserData.vendorApprovalStatus = 'pending';
        // Ensure deliveryPartnerApprovalStatus and storeManagerApprovalStatus are not set
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.storeManagerApprovalStatus;
    }
    else {
        // For other roles, remove all approval statuses
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.storeManagerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    }
    const newUser = yield userDao.createUserRecord(newUserData);
    yield (0, emailService_1.sendRegistrationEmail)(newUser.email, newUser.name);
    return newUser;
});
exports.createUser = createUser;
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield userDao.updateUserById(userId, updateData);
    return updatedUser;
});
exports.updateUser = updateUser;
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDao.findUserByField('email', email); // Make sure your DAO includes all needed fields
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    // Enforce delivery partner approval check
    if (user.role === 'delivery_partner' && user.deliveryPartnerApprovalStatus !== 'approved') {
        throw new Error('Delivery partner not approved by admin');
    }
    // Enforce vendor approval check
    if (user.role === 'vendor' && user.vendorApprovalStatus !== 'approved') {
        throw new Error('Vendor not approved by admin');
    }
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        aadhaarNumber: user.aadhaarNumber,
        storeManagerApprovalStatus: user.storeManagerApprovalStatus,
        deliveryPartnerApprovalStatus: user.deliveryPartnerApprovalStatus,
        vendorApprovalStatus: user.vendorApprovalStatus
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: payload };
});
exports.authenticateUser = authenticateUser;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.findUserById(id);
});
exports.findUserById = findUserById;
const getPhoneVerification = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDao.findUserById(userId);
    if (!user)
        throw new Error('User not found');
    return {
        isVerified: user.isPhoneVerified || false,
        phoneNumber: user.phoneNumber,
        lastVerified: user.phoneVerifiedAt
    };
});
exports.getPhoneVerification = getPhoneVerification;
const getAllFarmers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userDao.findAllFarmers();
});
exports.getAllFarmers = getAllFarmers;
const sendResetPasswordEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDao.findUserByField("email", email);
    if (!user)
        throw new Error("User not found");
    const token = (0, crypto_1.randomBytes)(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    yield user.save();
    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const message = `
    <p>Hello ${user.name},</p>
    <p>You requested a password reset. Click the link below:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>If you didn't request this, ignore this email.</p>
  `;
    yield (0, emailService_1.sendEmail)(user.email, "Reset Password Request", message);
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
const resetPassword = (token, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userDao.findUserByResetToken(token);
    if (!user || user.resetPasswordExpires.getTime() < Date.now()) {
        throw new Error("Invalid or expired token");
    }
    user.password = yield bcryptjs_1.default.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    yield user.save();
});
exports.resetPassword = resetPassword;
