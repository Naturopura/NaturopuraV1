import { Response, NextFunction, RequestHandler } from 'express';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadUser } from '../types/auth.types';
import { IUser } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
export const authenticateToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; // ✅ ends execution without returning a response object
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayloadUser;
    (req as AuthenticatedRequest).user = {
      _id: decoded._id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      // Add other properties from IUser if needed, or fetch the user from DB
    } as IUser;

    next(); // ✅ correct flow
  } catch (error) {
    console.error('Authentication middleware - Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' }); // ✅ no return here
  }
};
