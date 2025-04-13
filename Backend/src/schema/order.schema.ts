import { z } from 'zod';
import domPurify from '../config/domPurifyInstance.js';

// Cart Item Schema
const cartItemSchema = z.object({
  _id: z.string({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID must be a string"
  })
  .min(1, "ID is required")
  .transform(value => domPurify.sanitize(value.trim())),
  
  name: z.string({
    required_error: "Product name is required",
    invalid_type_error: "Product name must be a string"
  })
  .min(1, "Product name is required")
  .transform(value => domPurify.sanitize(value.trim())),

  slug: z.string({
    required_error: "Slug is required",
    invalid_type_error: "Slug must be a string"
  })
  .min(1, "Slug is required")
  .transform(value => domPurify.sanitize(value.trim())),
  
  imageUrl: z.string({
    required_error: "Image URL is required",
    invalid_type_error: "Image URL must be a string"
  })
  .url("Invalid image URL")
  .transform(value => domPurify.sanitize(value.trim())),
  
  unit: z.string({
    required_error: "Unit is required",
    invalid_type_error: "Unit must be a string"
  })
  .min(1, "Unit is required")
  .transform(value => domPurify.sanitize(value.trim())),
  
  stock: z.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock must be a number"
  })
  .int().nonnegative("Stock must be a non-negative integer"),
  
  price: z.union([
    z.string({
      required_error: "Price is required",
      invalid_type_error: "Price must be a string or number"
    })
    .min(1, "Price is required")
    .transform(value => parseFloat(domPurify.sanitize(value.trim()))),
    z.number().nonnegative("Price must be non-negative")
  ]),
  
  quantity: z.union([
    z.string()
      .min(1, "Quantity is required")
      .transform(value => parseInt(domPurify.sanitize(value.trim()))),
    z.number()
      .int()
      .positive("Quantity must be a positive integer")
  ]),
  
  discount: z.number()
    .int()
    .min(0)
    .max(100, "Discount must be between 0-100")
});

// Delivery Details Schema
const deliveryDetailsSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  })
  .min(2, "Name must be at least 2 characters")
  .transform(value => domPurify.sanitize(value.trim())),
  
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Invalid email format"
  })
  .email("Invalid email address")
  .transform(value => domPurify.sanitize(value.trim().toLowerCase())),
  
  contact: z.string({
    required_error: "Contact number is required",
    invalid_type_error: "Contact number must be a string"
  })
  .min(8, "Contact number must be at least 8 digits")
  .transform(value => domPurify.sanitize(value.trim())),
  
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string"
  })
  .min(5, "Address must be at least 5 characters")
  .transform(value => domPurify.sanitize(value.trim())),
  
  emirate: z.string({
    required_error: "Emirate is required",
    invalid_type_error: "Emirate must be a string"
  })
  .min(1, "Emirate is required")
  .transform(value => domPurify.sanitize(value.trim()))
});

export const orderRequestSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string"
    })
    .min(1, "User ID is required")
    .transform(value => domPurify.sanitize(value.trim()))
    .optional(),
    
    cartItems: z.array(cartItemSchema).nonempty("Cart cannot be empty"),
    deliveryDetails: deliveryDetailsSchema,
    
    totalAmount: z.union([
      z.string({
        required_error: "Total amount is required",
        invalid_type_error: "Total amount must be a string or number"
      })
      .min(1, "Total amount is required")
      .transform(value => parseFloat(domPurify.sanitize(value.trim()))),
      z.number().nonnegative("Total amount must be non-negative")
    ])
  })
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;
