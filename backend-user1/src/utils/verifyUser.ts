import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../../helper/ApiResponse";
import { ResponseDefinitions } from "../responses";
// import { errorHandler } from "./error.js";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return ApiResponse.error(
      ResponseDefinitions.InvalidPassword.message,
      ResponseDefinitions.InvalidPassword.code
    );
  }
  jwt.verify(token, process.env.TOKEN_SECRET!, (err: any, user: any) => {
    if (err) {
      return ApiResponse.error(
        ResponseDefinitions.InvalidPassword.message,
        ResponseDefinitions.InvalidPassword.code
      );
    }
    req.user = user;
    next();
  });
};
