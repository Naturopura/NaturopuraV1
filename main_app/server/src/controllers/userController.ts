// userController.ts

import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import * as userService from "../services/userService";
import * as userDao from "../dao/userDao";
import statusCode from "../utils/statusCode";
import { IUser } from "../models/User";
import { Address, NewAddress } from "../types";
import { JwtPayloadUser } from "../types/auth";

import { generateJwtToken } from "../config/passport";

export const googleOAuthCallback = (req: Request, res: Response): void => {
    // @ts-ignore
    const user = req.user;
    if (!user) {
        res.status(401).json({ message: "Authentication failed" });
        return;
    }

    const token = generateJwtToken(user);
    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    // Redirect to frontend with token and role
    const redirectUrl = `${clientUrl}/oauth-callback?token=${token}&role=${user.role}`;
    res.redirect(redirectUrl);
};

interface RegisterUserRequest {
    name: string;
    email: string;
    password: string;
    role: "admin" | "farmer" | "delivery_partner" | "store_manager" | "vendor"; // added vendor
    aadhaarNumber?: string;
    phoneNumber?: string;
    address?: string;
    farmSize?: number;
    cropTypes?: string[];
    location?: {
        latitude?: number;
        longitude?: number;
    };
    createdAt?: Date;
}

interface LoginUserRequest {
    email: string;
    password: string;
}

export const registerUser = async (
    req: Request<{}, {}, RegisterUserRequest>,
    res: Response
) => {
    try {
        const { role, name, email, location, phoneNumber } = req.body;

        if (role === "vendor") {
            if (!name || !email || !phoneNumber) {
                res.status(statusCode.BAD_REQUEST).json({
                    message:
                        "Missing required fields for vendor registration: name, email, phoneNumber",
                });
                return;
            }
        }

        const user = await userService.createUser(req.body);
        res.status(statusCode.CREATED).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            aadhaarNumber: user.aadhaarNumber,
        });
    } catch (error) {
        res.status(statusCode.BAD_REQUEST).json({
            message: error instanceof Error ? error.message : "Registration failed",
        });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const redirectToken = req.query.token as string | undefined;

    // Step 1: Authenticate user
    const { token, user } = await userService.authenticateUser(email, password);
    const typedUser = user as JwtPayloadUser;

    // Step 2: If redirect token is passed, verify it
    if (redirectToken) {
      try {
        const decoded = jwt.verify(
          redirectToken,
          process.env.JWT_SECRET!
        ) as JwtPayloadUser;

        if (
          decoded.email !== typedUser.email ||
          decoded._id.toString() !== typedUser._id.toString()
        ) {
          res.status(401).json({ message: "Unauthorized access: Token mismatch" });
          return;
        }
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
    }

    res.status(200).json({ token, user });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Login failed",
    });
  }
};



export const validateToken = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res
                .status(statusCode.UNAUTHORIZED)
                .json({ success: false, message: "Invalid token" });
            return;
        }

        const user = await userService.findUserById(req.user._id);
        if (!user) {
            res
                .status(statusCode.NOT_FOUND)
                .json({ success: false, message: "User not found" });
            return;
        }

        res.status(statusCode.OK).json({
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
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
};

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res
                .status(statusCode.UNAUTHORIZED)
                .json({ success: false, message: "Unauthorized" });
            return;
        }

        const user = await userService.findUserById(req.user._id);
        if (!user) {
            res
                .status(statusCode.NOT_FOUND)
                .json({ success: false, message: "User not found" });
            return;
        }

        res.status(statusCode.OK).json({
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
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error",
        });
    }
};

export const checkPhoneVerification = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            res
                .status(statusCode.UNAUTHORIZED)
                .json({ success: false, message: "Not authenticated" });
            return;
        }

        const result = await userService.getPhoneVerification(req.user._id);
        res.status(statusCode.OK).json({ success: true, ...result });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error ? error.message : "Phone verification failed",
        });
    }
};

export const getFarmers = async (req: Request, res: Response) => {
    try {
        const farmers = await userService.getAllFarmers();
        res.status(statusCode.OK).json({
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
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message:
                error instanceof Error ? error.message : "Could not fetch farmers",
        });
    }
};

export const updateUserProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Use only authenticated user's ID for update, ignore any userId in body for security
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { phoneNumber, email, name } = req.body;
        const updatedUser = await userService.updateUser(userId, req.body);
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res
            .status(500)
            .json({
                success: false,
                message: error instanceof Error ? error.message : "Update failed",
            });
    }
};

export const getUserAddresses = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: user.addresses || [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                error instanceof Error ? error.message : "Failed to get addresses",
        });
    }
};

export const addAddress = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const { address, isDefault } = req.body;
        const user = await userService.findUserById(userId);
        if (!user) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const newAddress = {
            ...address,
            isDefault: isDefault || false,
            createdAt: new Date(),
        };

        if (isDefault) {
            // Set all other addresses to not default
            user.addresses =
                user.addresses?.map((addr) => ({
                    ...addr,
                    isDefault: false,
                })) || [];
        }

        // First update the user with the new address
        await userDao.updateUserById(userId, {
            addresses: [...(user.addresses || []), newAddress],
        });

        // Then get the fresh user data to ensure we have the latest addresses
        const updatedUser = await userDao.findUserById(userId);
        if (!updatedUser) {
            throw new Error("User not found after update");
        }

        res.status(statusCode.CREATED).json({
            success: true,
            data: {
                newAddress,
                addresses: updatedUser.addresses,
            },
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error adding address",
        });
    }
};

export const updateAddress = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;
        const addressId = req.params.addressId;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const { address, isDefault } = req.body;
        const user = await userService.findUserById(userId);
        if (!user) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const addressIndex = user.addresses?.findIndex(
            (addr) => addr._id.toString() === addressId
        );
        if (addressIndex === -1) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "Address not found",
            });
            return;
        }

        const updatedAddress = {
            ...user.addresses[addressIndex],
            ...address,
            isDefault: isDefault || false,
            updatedAt: new Date(),
        };

        if (isDefault) {
            // Set all other addresses to not default
            user.addresses =
                user.addresses?.map((addr) => ({
                    ...addr,
                    isDefault: addr._id.toString() === addressId,
                })) || [];
        }

        user.addresses[addressIndex] = updatedAddress;
        await user.save();

        res.status(statusCode.OK).json({
            success: true,
            data: updatedAddress,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating address",
        });
    }
};

export const deleteAddress = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;
        const addressId = req.params.addressId;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const user = await userService.findUserById(userId); // DO NOT use .lean() here!
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        user.addresses = user.addresses.filter(
            (addr) => addr._id.toString() !== addressId
        );
        await user.save();
        res
            .status(200)
            .json({
                success: true,
                message: "Address deleted",
                addresses: user.addresses,
            });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting address",
        });
    }
};

export const getShippingAddress = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        const defaultAddress = user.addresses?.find((addr) => addr.isDefault);
        res.status(statusCode.OK).json({
            success: true,
            data: defaultAddress || null,
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error fetching shipping address",
        });
    }
};

export const updateShippingAddress = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user as IUser;
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(statusCode.UNAUTHORIZED).json({
                success: false,
                message: "Unauthorized",
            });
            return;
        }

        const { address } = req.body as { address: NewAddress };
        if (!address) {
            res.status(statusCode.BAD_REQUEST).json({
                success: false,
                message: "Address is required",
            });
            return;
        }

        // Update addresses array with the new default address
        const updatedUser = await userService.updateUser(userId, {
            addresses: [
                ...(user.addresses?.filter((addr) => !addr.isDefault) || []),
                {
                    ...address,
                    isDefault: true,
                    updatedAt: new Date(),
                },
            ],
        });
        if (!updatedUser) {
            res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
            return;
        }

        res.status(statusCode.OK).json({
            success: true,
            message: "Shipping address updated successfully",
            data: updatedUser.addresses.find((addr) => addr.isDefault),
        });
    } catch (error) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating shipping address",
        });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        await userService.sendResetPasswordEmail(email);
        res.status(200).json({ message: "Password reset email sent!" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const resetPasswordController = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        await userService.resetPassword(token, password);
        res.status(200).json({ message: "Password reset successful!" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};