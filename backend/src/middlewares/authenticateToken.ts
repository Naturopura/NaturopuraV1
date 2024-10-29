import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from '../environment/environment';  // Import the env object

interface AuthenticatedRequest extends Request {
  user?: string | object; 
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    // Use env.TOKEN_SECRET to verify the token
    const decoded = jwt.verify(token, env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateJWT;
