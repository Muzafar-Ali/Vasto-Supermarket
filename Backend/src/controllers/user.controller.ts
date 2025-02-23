import { NextFunction, Request, Response } from "express";
import { RegisterUserInput, registerUserSchema, UserLoginInput } from "../schema/user.schema.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import generateAccessTokenAndSetCookie from "../utils/generateAccessTokenAndSetCookie.js";
import generateRefreshTokenAndSetCookie from "../utils/generateRefreshTokenAndSetCookie.js";
import config from "../config/confiq.js";
import jwt from "jsonwebtoken";

export const registerUserHandler = async (req: Request<{}, {}, RegisterUserInput["body"]>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body

    const userExist = await UserModel.findOne({ email: userData.email })    
    if(userExist) throw new ErrorHandler("User already registered", 409)
    
     // Password mismatch logic is handled by Zod schema(registerUserSchema) (refine method)  
    // if(userData.password !== userData.confirmPassword) throw new ErrorHandler("Passwords does not match", 400)

    const newUser = new UserModel({
      ...req.body, 
      lastLoginDate: Date.now()
    })

    await newUser.save()

    res.status(200).json({
      message: "You registered successfully",
    })
    
  } catch (error) {
    console.error("registerUserController Error : ", error)
    next(error)
  }
}

export const userLoginHandler = async (req: Request<{}, {}, UserLoginInput['body']>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body
    
    const user = await UserModel.findOne({ email: userData.email })
    if (!user) throw new ErrorHandler("invalid credentials", 401)
    
    const isMatch = await user.comparePassword(userData.password)
    if (!isMatch) throw new ErrorHandler("invalid credentials", 401)
      
    if (user.status !== "active") throw new ErrorHandler("You are blocked by admin", 403)
    
    // Generate access token and refresh token and set cookies concurrently
    const [accessToken, refreshToken] = await Promise.all([
      generateRefreshTokenAndSetCookie(user._id, res),
      generateAccessTokenAndSetCookie(user._id, res)
    ])

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { 
        lastLoginDate: Date.now(),
        refreshToken 
      },
      { new: true }
    );

    res.status(200).json({
      message: `Welcome back ${updatedUser.name}`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        lastLoginDate: updatedUser.lastLoginDate
      }
    })

  } catch (error) {
    console.error("userLoginHandler Error : ", error)
    next(error)
  }
}

export const userLogoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    await UserModel.findByIdAndUpdate(userId, { refreshToken: "" });

    res.status(200).json({
      message: "Logged out successfully"
    })

  } catch (error) {
    console.error("userLogoutHandler Error : ", error)
    next(error)
  }
}

export const refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];
    
    if(!refreshToken) throw new ErrorHandler("Unauthorized", 401);

    const decode = jwt.verify(refreshToken, config.jwtSecret!) as jwt.JwtPayload;
    if(!decode) throw new ErrorHandler("invalid token", 401);

    const expiray = decode?.exp! * 1000;
    if( expiray < Date.now()) throw new ErrorHandler("Token expired", 401);


    const user = await UserModel.findById(decode.userId)
    if(!user) throw new ErrorHandler("invalid token", 401);
    if(user.refreshToken !== refreshToken) throw new ErrorHandler("invalid token", 401)

    generateAccessTokenAndSetCookie(user._id, res)

    res.status(200).json({
      message: "Access Token refreshed successfully"
    })

  } catch (error) {
    console.error("refreshAccessTokenHandler Error : ", error)
    next(error)
  }
}  