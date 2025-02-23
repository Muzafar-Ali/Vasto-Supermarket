import { z } from "zod";
import domPurify from "../config/domPurifyInstance.js";

// user registration request validation
export const registerUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, { message: "Username is required" })
    .transform((value) => domPurify.sanitize(value.trim())),
    
    email: z.string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email address" })
    .transform((value) => domPurify.sanitize(value.trim().toLowerCase())),
    
    password: z.string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .transform((value) => value.trim()),
    
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    })
    .min(6, { message: "Confirm Password must be at least 6 characters long" })
    .transform((value) => value.trim()),

  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
})

// user login request validation
export const userLoginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    })
    .email("Invalid email")
    .transform((value) => domPurify.sanitize(value.trim().toLowerCase())),
    
    password: z.string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters long")
    .transform((value) => domPurify.sanitize(value.trim())),
  })
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type UserLoginInput = z.infer<typeof userLoginSchema>