import { NextFunction, Request, Response } from "express";
import AppError from "../../error/AppError";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import userService from "./user.service";
import catchAsync from "../../utils/catchAsync";

const signup = catchAsync(async (req, res) => {
  const response = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: response,
  });
});

const login = catchAsync(async (req, res) => {
  const response = await userService.loginUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token: response.token,
    data: response.user,
  });
});

const userController = {
  signup,
  login,
};

export default userController;
