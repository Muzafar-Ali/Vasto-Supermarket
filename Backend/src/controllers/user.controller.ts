import { NextFunction, Request, Response } from "express";
import { RegisterUserInput, registerUserSchema, UserLoginInput } from "../schema/user.schema.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import generateAccessTokenAndSetCookie from "../utils/generateAccessTokenAndSetCookie.js";
import config from "../config/confiq.js";
import jwt from "jsonwebtoken";
import { loginUser, refreshAccessToken } from "../services/user.services.js";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/register
 * @access  Public
 */
export const registerUserHandler = async (req: Request<{}, {}, RegisterUserInput["body"]>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body

    const userExist = await UserModel.findOne({ email: userData.email })    
    if(userExist) throw new ErrorHandler("User already registered", 409)
    
     // Password mismatch logic is handled by Zod schema(registerUserSchema) (refine method)  
    // if(userData.password !== userData.confirmPassword) throw new ErrorHandler("Passwords does not match", 400)

    const newUser = new UserModel(userData)
    
    await newUser.save()

    res.status(200).json({
      message: "You registered successfully",
    })
    
  } catch (error) {
    console.error("registerUserController Error : ", error)
    next(error)
  }
}

/**
 * @desc    User login and generate tokens
 * @route   POST /api/v1/login
 * @access  Public
 */
export const userLoginHandler = async (req: Request<{}, {}, UserLoginInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Call the service to handle login logic
    const updatedUser = await loginUser(email, password, res);

    res.status(200).json({
      message: `Welcome back ${updatedUser.name}`,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        lastLoginDate: updatedUser.lastLoginDate
      }
    });

  } catch (error) {
    console.error("userLoginHandler Error : ", error);
    next(error);
  }
};

/**
 * @desc    User logout and clear tokens
 * @route   POST /api/v1/logout
 * @access  Private
 */
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

/**
 * @desc    Refresh access token using refresh token
 * @route   POST /api/v1/refresh-token
 * @access  Public
 */
export const refreshAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization?.split(' ')[1];
    if (!refreshToken) throw new ErrorHandler("Unauthorized", 401);

    // Call the service to handle the token refresh
    await refreshAccessToken(refreshToken, res);

    res.status(200).json({
      message: "Access Token refreshed successfully"
    });

  } catch (error) {
    console.error("refreshAccessTokenHandler Error : ", error);
    next(error);
  }
};
