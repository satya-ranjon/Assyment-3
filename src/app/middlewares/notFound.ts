/**
 * The function `notFound` returns a JSON response with a 404 status code and a message indicating that
 */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not found !",
    error: "",
  });
};

export default notFound;
