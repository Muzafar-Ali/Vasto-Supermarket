import { z } from "zod";
import domPurify from "../config/domPurifyInstance.js";

export const addCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Category name is required"
    })
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot be longer than 100 characters") // Optional max length
    .transform((value) => domPurify.sanitize(value.trim())),

    description: z.string({
      required_error: "Description is required"
    })
    .min(3, "Description must be at least 3 characters")
    .max(500, "Description cannot be longer than 500 characters") // Optional max length
    .transform((value) => domPurify.sanitize(value.trim()))

    // image:  this will be handled by multer 
  }),

});

export const updateCategorySchema = addCategorySchema.extend({
  body: addCategorySchema.shape.body.partial(),  // This makes all fields optional in the body
  params: z.object({
    id: z.string({
      required_error: "Category id is required"
    }).transform((value) => domPurify.sanitize(value.trim()))
  })
});

export type AddCategoryInput = z.infer<typeof addCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
