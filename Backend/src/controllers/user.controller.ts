import { NextFunction, Request, Response } from "express";
import { RegisterUserInput, registerUserSchema } from "../schema/reisgterUser.schema.js";
import UserModel from "../models/user.model.js";
import ErrorHandler from "../utils/errorClass.js";

export const registerUserController = async (req: Request<{}, {}, RegisterUserInput["body"]>, res: Response, next: NextFunction) => {
  try {
    const userData = req.body

    const userExist = await UserModel.findOne({ email: userData.email })    
    if(userExist) throw new ErrorHandler("User already registered", 409)
    
     // Password mismatch logic is  handled by Zod schema(registerUserSchema) (refine method)  
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