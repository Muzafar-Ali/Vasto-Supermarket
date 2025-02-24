import { z } from "zod";
import domPurify from "../config/domPurifyInstance.js";

export const addSubCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "sub Category name is required"
    })
    .min(3, "sub Category name must be at least 3 characters")
    .max(100, "sub Category name cannot be longer than 100 characters") // Optional max length
    .transform((value) => domPurify.sanitize(value.trim())),
    
    category: z.array(
      z.string({
        required_error: "Category id is required"
      }).transform((value) => domPurify.sanitize(value.trim()))
    ).nonempty()
  
    // image:  this will be handled by multer 

  }),
})

export const updateSubCategorySchema = addSubCategorySchema.extend({
  body: addSubCategorySchema.shape.body.partial(),  // Make all fields optional in the body
  params: z.object({
    id: z.string({
      required_error: "sub Category id is required"
    }).transform((value) => domPurify.sanitize(value.trim()))
  })
})

export type AddSubCategoryInput = z.infer<typeof addSubCategorySchema>;
export type UpdateSubCategoryInput = z.infer<typeof updateSubCategorySchema>;

