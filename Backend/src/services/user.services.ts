import config from "../config/confiq.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";
import generateAccessTokenAndSetCookie from "../utils/generateAccessTokenAndSetCookie.js";
import generateRefreshTokenAndSetCookie from "../utils/generateRefreshTokenAndSetCookie.js";
import jwt from "jsonwebtoken";


export const loginUser = async (email: string, password: string, res: any) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new ErrorHandler("invalid credentials", 401);

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ErrorHandler("invalid credentials", 401);

  // Check if the user is blocked
  if (user.status !== "active") throw new ErrorHandler("You are blocked by admin", 403);

  // Generate tokens and set cookies
  const [accessToken, refreshToken] = await Promise.all([
    generateRefreshTokenAndSetCookie(user._id, res),
    generateAccessTokenAndSetCookie(user._id, res),
  ]);

  // Update user with last login date and refresh token
  const updatedUser = await UserModel.findByIdAndUpdate(
    user._id,
    { 
      lastLoginDate: Date.now(), 
      refreshToken 
    },
    { new: true }
  );

  return updatedUser; // Return updated user for further use in controller
};

export const refreshAccessToken = async (refreshToken: string, res: any) => {
  try {
    const decode = jwt.verify(refreshToken, config.jwtSecret!) as jwt.JwtPayload;

    // Check if the token has expired
    const expiration = decode?.exp! * 1000;
    if (expiration < Date.now()) throw new ErrorHandler("Token expired", 401);

    // Check if the user exists and if the refresh token is valid
    const user = await UserModel.findById(decode.userId);
    if (!user) throw new ErrorHandler("User not found", 401);
    if (user.refreshToken !== refreshToken) throw new ErrorHandler("Invalid refresh token", 401);

    // Generate a new access token and set it as a cookie
    await generateAccessTokenAndSetCookie(user._id, res);

    return true; // Indicate success
  } catch (error) {
    throw new ErrorHandler("Invalid refresh token", 401); // Handle any JWT-specific or other errors
  }
};
