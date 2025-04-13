import mongoose from "mongoose";
import SubCategoryModel from "../models/subCategory.js";
import ErrorHandler from "../utils/errorClass.js";
import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js";
import uploadSingleImageToCloudinary from "../utils/uploadSingleImageToCloudinary.js";

export const addSubCategory = async (name: string, category: string[], image: Express.Multer.File) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    // Check if category already exists
    const subCategoryExists = await SubCategoryModel.findOne({ name }).session(session);
    if (subCategoryExists) throw new ErrorHandler("Sub Category already exists", 400);

    // Upload image to Cloudinary
    const imageUrl = await uploadSingleImageToCloudinary(image, "sub-category", name);
    if (!imageUrl) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);

    // Create the category in the database
    const subCategory = await SubCategoryModel.create([{
      name,
      category,
      image: imageUrl
    }], { session }); // Pass the session with the create operation

    if (!subCategory) throw new ErrorHandler("Sub Category not created", 400);

    await session.commitTransaction();

    return subCategory;

  } catch (error) {
    await session.abortTransaction(); 
    throw error; // Propagate the error to the controller
  } finally {
    session.endSession();
  }
};

export const updateSubCategory = async (id: string, name?: string, category?: string[], image?: Express.Multer.File) => {
  const updateSubCategoryData: any = {};

  if (name) updateSubCategoryData.name = name;
  if (category) updateSubCategoryData.category = category;
  if (image) {
    const imageUrl = await uploadSingleImageToCloudinary(image, "category");
    if (!imageUrl) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);
    updateSubCategoryData.image = imageUrl;
  }

  const updatedSubCategory = await SubCategoryModel.findByIdAndUpdate(id, updateSubCategoryData, { new: true });
  if (updatedSubCategory._id.toString() !== id) throw new ErrorHandler("Category not found", 404);
  if (!updatedSubCategory) throw new ErrorHandler("Category not updated", 400);

  return updatedSubCategory;
};

export const deleteSubCategoryService = async (id: string) => {

  // Check if the sub category is associated with any products
  const products = await ProductModel.find({ 
    subCategory: { $in: [id] } 
  }).countDocuments();

  if (products > 0) {
    throw new ErrorHandler("Category cannot be deleted as it is associated with subcategories or products", 400);
  }

  // Proceed to delete the category
  await CategoryModel.findByIdAndDelete(id);
};