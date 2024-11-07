import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "../environment/environment";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
    isRemember: boolean;
    walletAddress: string;
    iat: number;
    exp: number;
  };
}

const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("got token", token);

  if (!token) {
    res.status(401).json({ message: "Access token required" });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.TOKEN_SECRET);
    req.user = decoded as AuthenticatedRequest["user"];
    console.log("going to next", req.user);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default authenticateJWT;
