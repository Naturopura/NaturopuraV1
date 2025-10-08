"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const verifyUser = (user) => {
    if (!user) {
        return {
            success: false,
            statusCode: 401,
            message: "User not authenticated"
        };
    }
    return {
        success: true,
        statusCode: 200,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            kyc: user.kyc,
        }
    };
};
exports.verifyUser = verifyUser;
