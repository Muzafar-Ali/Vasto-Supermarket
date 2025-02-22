import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import jwt from "jsonwebtoken";
import config from "../config/confiq.js";

declare global {
  namespace Express{
    interface Request {
      userId: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const  accessToken  = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
    if(!accessToken) throw new ErrorHandler("Unauthorized", 401);

    const decode = jwt.verify(accessToken, config.jwtSecret!) as jwt.JwtPayload; 
    if(!decode) throw new ErrorHandler("invalid token", 401);


    req.userId = decode.userId

    next()

  } catch (error) {
    console.error("isAuthenticated Error : ", error)
    next(error)
  }
}

export default isAuthenticated;