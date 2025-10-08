// userServices.ts

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import * as userDao from '../dao/userDao';
import { sendRegistrationEmail,sendEmail } from '../utils/emailService';
import { JwtPayloadUser } from '../types/auth.types';


export const createUser = async (userData: any) => {
    const existingUser = await userDao.findUserByField('email', userData.email);
    if (existingUser) throw new Error('User already exists');

    if (userData.role !== 'delivery_partner' && userData.role !== 'vendor' && userData.aadhaarNumber) {
        const existingAadhaar = await userDao.findUserByField('aadhaarNumber', userData.aadhaarNumber);
        if (existingAadhaar) throw new Error('Aadhaar already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUserData: any = {
        ...userData,
        password: hashedPassword
    };

    // Set only the relevant approval status
    if (userData.role === 'delivery_partner') {
        newUserData.deliveryPartnerApprovalStatus = 'pending';
        // Ensure storeManagerApprovalStatus and vendorApprovalStatus are not set
        delete newUserData.storeManagerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    } else if (userData.role === 'store_manager') {
        newUserData.storeManagerApprovalStatus = 'pending';
        // Ensure deliveryPartnerApprovalStatus and vendorApprovalStatus are not set
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    } else if (userData.role === 'vendor') {
        newUserData.vendorApprovalStatus = 'pending';
        // Ensure deliveryPartnerApprovalStatus and storeManagerApprovalStatus are not set
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.storeManagerApprovalStatus;
    } else {
        // For other roles, remove all approval statuses
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.storeManagerApprovalStatus;
        delete newUserData.vendorApprovalStatus;
    }

    const newUser = await userDao.createUserRecord(newUserData);
    await sendRegistrationEmail(newUser.email, newUser.name);

    return newUser;
};

export const updateUser = async (userId: string, updateData: Partial<any>) => {
    const updatedUser = await userDao.updateUserById(userId, updateData);
    return updatedUser;
};

export const authenticateUser = async (email: string, password: string) => {
    const user = await userDao.findUserByField('email', email); // Make sure your DAO includes all needed fields
    if (!user || !(await bcrypt.compare(password, user.password))) {
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

    const payload: JwtPayloadUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        aadhaarNumber: user.aadhaarNumber,
        storeManagerApprovalStatus: user.storeManagerApprovalStatus,
        deliveryPartnerApprovalStatus: user.deliveryPartnerApprovalStatus,
        vendorApprovalStatus: user.vendorApprovalStatus,
        kyc: user.kyc
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return { token, user: payload };
};

export const findUserById = async (id: string) => {
    return await userDao.findUserById(id);
};

export const getPhoneVerification = async (userId: string) => {
    const user = await userDao.findUserById(userId);
    if (!user) throw new Error('User not found');

    return {
        isVerified: user.isPhoneVerified || false,
        phoneNumber: user.phoneNumber,
        lastVerified: user.phoneVerifiedAt
    };
};

export const getAllFarmers = async () => {
    return await userDao.findAllFarmers();
};

export const sendResetPasswordEmail = async (email: string) => {
    const user = await userDao.findUserByField("email", email);
    if (!user) throw new Error("User not found");

    const token = randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    const message = `
        <p>Hello ${user.name},</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, ignore this email.</p>
    `;

    await sendEmail(user.email, "Reset Password Request", message);
};

export const resetPassword = async (token: string, newPassword: string) => {
    const user = await userDao.findUserByResetToken(token);
    if (!user || user.resetPasswordExpires!.getTime() < Date.now()) {
        throw new Error("Invalid or expired token");
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};