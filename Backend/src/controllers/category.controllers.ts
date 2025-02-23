import { NextFunction, Request, Response } from "express";
import { AddCategoryInput } from "../schema/category.schema.js";
import CategoryModel from "../models/category.model.js";
import ErrorHandler from "../utils/errorClass.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";
import mongoose from "mongoose";

export const addCategoryHandler = async (req: Request<{}, {}, AddCategoryInput["body"]>, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession(); // Start a new session

  try {
    session.startTransaction(); // Start the transaction

    const { name, description } = req.body;
    const image = req.file;

    if (!image) throw new ErrorHandler("Image is required", 400);

    // Check if category already exists
    const categoryExists = await CategoryModel.findOne({ name }).session(session); // Ensure this query runs within the session
    if (categoryExists) throw new ErrorHandler("Category already exists", 400);

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(image, "category");
    if (!imageUrl) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);

    // Create the category in the database
    const category = await CategoryModel.create([{
      name,
      description,
      image: imageUrl
    }], { session }); // Pass the session with the create operation

    if (!category) throw new ErrorHandler("Category not created", 400);

    // Commit the transaction if everything is successful
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });

  } catch (error) {
    // If any error occurs, abort the transaction and handle the error
    await session.abortTransaction(); // Rollback all changes in the transaction
    console.error("addCategoryHandler Error : ", error);
    next(error);
  } finally {
    // End the session
    session.endSession();
  }
};
