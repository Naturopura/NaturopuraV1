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
exports.findUserByResetToken = exports.updateUserPassword = exports.findAllFarmers = exports.updateUserById = exports.createUserRecord = exports.findUserById = exports.findUserByField = void 0;
const User_1 = __importDefault(require("../models/User"));
const findUserByField = (field, value) => {
    return User_1.default.findOne({ [field]: value })
        .select('+storeManagerApprovalStatus +deliveryPartnerApprovalStatus');
};
exports.findUserByField = findUserByField;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(id); // DO NOT use .lean() here!
});
exports.findUserById = findUserById;
const createUserRecord = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default(userData);
    return yield newUser.save();
});
exports.createUserRecord = createUserRecord;
const updateUserById = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    if (updateData.password)
        delete updateData.password; // prevent password update here
    return yield User_1.default.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');
});
exports.updateUserById = updateUserById;
const findAllFarmers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find({ role: 'farmer' }).select('-password').sort({ name: 1 });
});
exports.findAllFarmers = findAllFarmers;
const updateUserPassword = (userId, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
});
exports.updateUserPassword = updateUserPassword;
const findUserByResetToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
});
exports.findUserByResetToken = findUserByResetToken;
