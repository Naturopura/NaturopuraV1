import { Request, Response } from 'express';
import { JwtPayloadUser } from '../types/auth.types';
import { verifyUser } from '../services/authService';
import STATUS_CODE from '../utils/statusCode';

interface AuthenticatedRequest extends Request {
    user: JwtPayloadUser;
}

export const verifyToken = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const result = verifyUser(req.user as any);
        
        if (result.success) {
            return res.status(result.statusCode).json({
                success: true,
                user: result.user
            });
        } else {
            return res.status(result.statusCode).json({
                success: false,
                message: result.message
            });
        }
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
