<<<<<<< HEAD
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from "../environment/environment";

// Define the shape of your JWT payload
interface AuthTokenPayload extends JwtPayload {
  address: string;
}

export async function authenticateToken(
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers['x-access-token'] as string | undefined;
    if (!token) {
      throw new Error('No Token Found');
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, env.TOKEN_SECRET) as AuthTokenPayload;

    // Attach the decoded address to the request object
    req.address = decoded.address;
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
=======
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
>>>>>>> rakesh-bin
