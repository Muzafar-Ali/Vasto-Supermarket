import { z } from "zod";
import DOMPurify from 'dompurify';
import { JSDOM } from "jsdom";

// Create a DOMPurify instance
const window = new JSDOM("").window;
const domPurify = DOMPurify(window)

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
    .transform((value) => domPurify.sanitize(value.trim().toLocaleLowerCase())),
    
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

export type RegisterUserInput = z.infer<typeof registerUserSchema>