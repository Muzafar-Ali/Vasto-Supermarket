import { z } from "zod";

export const deliveryDetailsSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string()
    .email("Invalid email address"),
  contact: z.string()
    .min(9, "Contact number must be at least 9 digits")
    .max(15, "Contact number cannot exceed 15 digits")
    .regex(/^[0-9+]+$/, "Contact number can only contain numbers and +"),
  address: z.string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address cannot exceed 100 characters"),
  emirate: z.string()
    .min(1, "Please select an emirate"),
});


export type TDeliveryDetails = z.infer<typeof deliveryDetailsSchema>;


