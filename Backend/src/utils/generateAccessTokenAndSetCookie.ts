import { Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/confiq.js";

const generateAccessTokenAndSetCookie = async (userId: mongoose.Schema.Types.ObjectId, res: Response) => {
 
  const token = jwt.sign({ userId }, config.jwtSecret as string, { expiresIn: config.accessTokenExpiresIn});
  
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: config.environment === "production" ? true : false,
    sameSite: "strict",
    maxAge: config.accessTokenCookieExpiresIn,
  })

  return token
}

export default generateAccessTokenAndSetCookie;