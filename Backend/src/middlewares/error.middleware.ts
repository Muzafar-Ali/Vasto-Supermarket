import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import config from "../config/confiq.js";

export const errorHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) {
  
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({ 
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    stack: config.environment === "development" ? err.stack : null,
  });
}