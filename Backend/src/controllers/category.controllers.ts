import { NextFunction, Request, Response } from "express";
import { AddCategoryInput, UpdateCategoryInput } from "../schema/category.schema.js";
import CategoryModel from "../models/category.model.js";
import ErrorHandler from "../utils/errorClass.js";
import mongoose from "mongoose";
import { addCategory, deleteCategoryService, updateCategory } from "../services/category.services.js";
import SubCategory from "../models/subCategory.js";
import ProductModel from "../models/product.model.js";

/**
 * @desc    Add a new category
 * @route   POST /api/v1/category
 * @access  Private (requires authentication)
 */
export const addCategoryHandler = async (req: Request<{}, {}, AddCategoryInput["body"]>, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession(); // Start a new session

  try {
    session.startTransaction(); // Start the transaction

    const { name, description } = req.body;
    const image = req.file;

    if (!image) throw new ErrorHandler("Image is required", 400);

    // Call the service to add the category
    await addCategory(name, description, image);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });

  } catch (error) {
    console.error("addCategoryHandler Error : ", error);
    next(error); // Pass the error to error handling middleware
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/v1/category
 * @access  Public
 */
export const getAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await CategoryModel.find({});

    if (!categories) throw new ErrorHandler("No categories found", 404);

    res.status(200).json({
      success: true,
      categories,
    });

  } catch (error) {
    console.error("getAllCategoriesHandler Error : ", error);
    next(error);
  }
};

/**
 * @desc    Update an existing category
 * @route   PATCH /api/v1/category/:id
 * @access  Private (requires authentication)
 */
export const updateCategoryHandler = async (req: Request<UpdateCategoryInput['params'], {}, UpdateCategoryInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file;

    // Call the service to update the category
    await updateCategory(id, name, description, image);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });

  } catch (error) {
    console.error("updateCategory Error : ", error);
    next(error);
  }
};

/**
 * @desc    Delete an existing category
 * @route   DELETE /api/v1/category/:id
 * @access  Private (requires authentication)
 */
export const deleteCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Call the service to delete the category
    await deleteCategoryService(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error("deleteCategory Error : ", error);
    next(error);
  }
};