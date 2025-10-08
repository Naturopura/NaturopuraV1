import { IUser } from '../models/User';

interface VerifyUserResponse {
    success: boolean;
    statusCode: number;
    message?: string;
    user?: Partial<IUser>;
}

export const verifyUser = (user: IUser | null): VerifyUserResponse => {
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
