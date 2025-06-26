import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as userDao from '../dao/userDao';
import { JwtPayloadUser } from '../types/auth.types';

export const createUser = async (userData: any) => {
    const existingUser = await userDao.findUserByField('email', userData.email);
    if (existingUser) throw new Error('User already exists');

    if (userData.role !== 'delivery_partner' && userData.aadhaarNumber) {
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
        // Ensure storeManagerApprovalStatus is not set
        delete newUserData.storeManagerApprovalStatus;
    } else if (userData.role === 'store_manager') {
        newUserData.storeManagerApprovalStatus = 'pending';
        // Ensure deliveryPartnerApprovalStatus is not set
        delete newUserData.deliveryPartnerApprovalStatus;
    } else {
        // For other roles, remove both approval statuses
        delete newUserData.deliveryPartnerApprovalStatus;
        delete newUserData.storeManagerApprovalStatus;
    }

    const newUser = await userDao.createUserRecord(newUserData);

    return newUser;
};

export const updateUser = async (userId: string, updateData: Partial<any>) => {
    return userDao.updateUserById(userId, updateData);
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

    const payload: JwtPayloadUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        aadhaarNumber: user.aadhaarNumber,
        storeManagerApprovalStatus: user.storeManagerApprovalStatus,
        deliveryPartnerApprovalStatus: user.deliveryPartnerApprovalStatus
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


