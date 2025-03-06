import { z } from "zod"
import domPurify from "../config/domPurifyInstance.js"

// create product request validation & sanitization
export const createProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }).transform(value => domPurify.sanitize(value.trim())),

    description: z.string({
      required_error: "Description is required",
    }).transform(value => domPurify.sanitize(value.trim())),
    
    category: z.array(
      z.string({
        required_error: "Category is required",
      }), 
      {
        required_error: "At least one category is required"
      }
    ).transform(value => value.map(category => domPurify.sanitize(category.trim()))),
    
    
    subCategory: z.array(
      z.string({
        required_error: "Sub Category is required",
      }),
      {
        required_error: "At least one sub category is required"
      }
    ).transform(value => value.map(subCategory => domPurify.sanitize(subCategory.trim()))),
    
    price: z.string({
      required_error: "Price is required",
    }).transform(value => Number(domPurify.sanitize(value.trim()))),

    
    discount: z.string({
      required_error: "Discount is required",
    }).transform(value => Number(domPurify.sanitize(value.trim()))),
    
    unit: z.string({
      required_error: "Unit is required",
    }).default(""),
    
    stock: z.string({
      required_error: "Stock is required",
    }).transform(value => Number(domPurify.sanitize(value.trim()))),
    
    // tags: z.array(
    //   z.string({
    //     required_error: "Tags is required",
    //   }), 
    //   {
    //     required_error: "At least one tag is required"
    //   }
    // ).transform(value => value.map(tag => domPurify.sanitize(tag.trim()))),
    
    // Using z.record for dynamic keys and values
    moreDetails: z.record(z.string()).optional(),

    published: z.boolean({
      required_error: "Publish is required",
    }).default(true),
  })
})

// get product request validation & sanitization
export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "id is required",
    }).transform(value => domPurify.sanitize(value.trim())),
  })
})

// update product request validation & sanitization
export const updateProductSchema = createProductSchema.extend({
  body: createProductSchema.shape.body.partial(),  // This makes all fields optional in the body
  params: z.object({
    id: z.string({
      required_error: "Product id is required",
    }).transform(value => domPurify.sanitize(value.trim())),
  })
})


export type CreateProductInput = z.infer<typeof createProductSchema> 
export type GetProductByIdInput = z.infer<typeof getProductByIdSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
