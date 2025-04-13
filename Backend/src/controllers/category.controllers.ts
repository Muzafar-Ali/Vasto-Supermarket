import { NextFunction, Request, Response } from "express";
import { AddCategoryInput, DeleteCategoryInput, UpdateCategoryInput } from "../schema/category.schema.js";
import CategoryModel from "../models/category.model.js";
import ErrorHandler from "../utils/errorClass.js";
import mongoose from "mongoose";
import { addCategory, deleteCategoryService, updateCategory } from "../services/category.services.js";
import ProductModel from "../models/product.model.js";
import { GetProductByIdInput } from "../schema/product.schema.js";

/**
 * @desc    Add a new category
 * @route   POST /api/v1/category
 * @access  Private (requires authentication)
 */
export const addCategoryHandler = async (req: Request<{}, {}, AddCategoryInput["body"]>, res: Response, next: NextFunction) => {
  try {
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
 * @desc    Get single category
 * @route   GET /api/v1/category/:id
 * @access  Public
 */
export const getSingleCategoryHandler = async (req: Request<GetProductByIdInput["params"]>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const categoryProducts = await ProductModel.find({category: id});
    if (!categoryProducts) throw new ErrorHandler("category Products not found", 404);

    res.status(200).json({
      success: true,
      categoryProducts,
    });

  } catch (error) {
    console.error("getSingleCategoryHandler Error : ", error);
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
export const deleteCategoryHandler = async (req: Request<GetProductByIdInput['params']>, res: Response, next: NextFunction) => {
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