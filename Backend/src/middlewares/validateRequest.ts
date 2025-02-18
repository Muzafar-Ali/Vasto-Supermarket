import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import ErrorHandler from "../utils/errorClass.js";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      if(!result.success) {
        const errorMessages  = result.error.issues.map((issue: any) => issue.message).join(", ");
        throw new ErrorHandler(errorMessages, 400)
      }

      // If validation succeeds, assign validated data to the request
      req.body = result.data.body;
      req.query = result.data.query;
      req.params = result.data.params;

      next();

    } catch (error) {
      console.error("validateRequestData error = ", error);
      next(error);
    }
  };
}

export default validateRequest;