import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import env from '../environment/environment';

interface AuthenticatedRequest extends Request {
  user?: string | object; 
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return; 
  }

  try {
    
    const decoded = jwt.verify(token, env.TOKEN_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticateJWT;
