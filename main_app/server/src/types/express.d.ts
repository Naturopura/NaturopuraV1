// types/express.d.ts
import { IUser } from "../models/User";
import { Request } from "express";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
