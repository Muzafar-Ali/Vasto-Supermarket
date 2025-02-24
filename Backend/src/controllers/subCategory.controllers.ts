import { NextFunction, Request, Response } from "express";
import { AddSubCategoryInput, UpdateSubCategoryInput } from "../schema/subCategory.schema.js";
import ErrorHandler from "../utils/errorClass.js";
import { addSubCategory, deleteSubCategoryService, updateSubCategory } from "../services/subCategory.services.js";
import SubCategoryModel from "../models/subCategory.js";

/**
 * @desc    Add a new sub category
 * @route   POST /api/v1/sub-category
 * @access  Private (requires authentication)
 */
export const addSubCategoryHandler = async (req: Request<{}, {}, AddSubCategoryInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { name, category } = req.body
    const image = req.file

    if(!image) throw new ErrorHandler("Image is required", 400);

    // Call the service to add the sub category
    await addSubCategory(name, category, image); 

    res.status(201).json({
      success: true,
      message: "Sub category added successfully",
    })
    
  } catch (error) {
    console.error("addSubCategoryHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Get all sub categories
 * @route   GET /api/v1/sub-category
 * @access  Public
 */
export const getAllSubCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the service to get all sub categories
    const subCategories = await SubCategoryModel.find({}).sort({ createdAt: -1 });
    if(!subCategories) throw new ErrorHandler("No sub categories found", 404);

    res.status(200).json({
      success: true,
      data: subCategories,
    })
  } catch (error) {
    console.error("getAllSubCategoriesHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Update an existing sub category by ID
 * @route   PATCH /api/v1/sub-category/:id
 * @access  Private (Authenticated users only)
 */
export const updateSubCAtegory = async (req: Request<UpdateSubCategoryInput['params'], {}, UpdateSubCategoryInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;
    const image = req.file;
    
    if(!image) throw new ErrorHandler("Image is required", 400);

    // Call the service to update the sub category
    await updateSubCategory(id, name, category, image);

    res.status(200).json({
      success: true,
      message: "Sub category updated successfully",
    });

  } catch (error) {
    console.error("updateSubCategory Error : ", error);
    next(error);
  }
}

/**
 * @desc    Delete an existing sub category
 * @route   DELETE /api/v1/sub-category/:id
 * @access  Private (requires authentication)
 */
export const deleteSubCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Call the service to delete the sub category
    await deleteSubCategoryService(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    console.error("deleteCategory Error : ", error);
    next(error);
  }
};