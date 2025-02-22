import { Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/confiq.js";

const generateRefreshTokenAndSetCookie = async (userId: mongoose.Schema.Types.ObjectId, res: Response) => {
  try {
    const token = jwt.sign({ userId }, config.jwtSecret as string, { expiresIn: config.refreshTokenExpiresIn});
    
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: config.environment === "production" ? true : false,
      sameSite: "strict",
      maxAge: config.refreshTokenCookieExpiresIn
    })
    
    return token
  } catch (error) {
    console.error("generateRefreshTokenAndSetCookie Error : ", error) 
  }
 

}

export default generateRefreshTokenAndSetCookie ;