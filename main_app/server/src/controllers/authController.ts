import { Request, Response } from 'express';
import { JwtPayloadUser } from '../types/auth.types';
import { verifyUser } from '../services/authService';
import STATUS_CODE from '../utils/statusCode';
import { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
    user: IUser;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const result = verifyUser(req.user as any);
        
        if (result.success) {
            res.status(result.statusCode).json({
                success: true,
                user: result.user
            });
        } else {
            res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
