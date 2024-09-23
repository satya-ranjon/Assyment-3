import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../module/user/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
    }

    if (
      requiredRoles.length &&
      !requiredRoles.includes(decoded.role as TUserRole)
    ) {
      console.log("Forbidden");
      throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  });
};

export default auth;
