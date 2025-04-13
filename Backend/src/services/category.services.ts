import CategoryModel from "../models/category.model.js";
import ErrorHandler from "../utils/errorClass.js";
import mongoose from "mongoose";
import SubCategoryModel from "../models/subCategory.js";
import ProductModel from "../models/product.model.js";
import uploadSingleImageToCloudinary from "../utils/uploadSingleImageToCloudinary.js";


export const addCategory = async (name: string, description: string, image: Express.Multer.File) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    // Check if category exists
    const categoryExists = await CategoryModel.findOne({ name }).session(session);
    if (categoryExists) throw new ErrorHandler("Category already exists", 400);

    // Upload image (outside transaction since it's external)
    const imageUrl = await uploadSingleImageToCloudinary(image, "category", name);
    if (!imageUrl) throw new ErrorHandler("Failed to upload image", 500);

    // Create category
    const [category] = await CategoryModel.create([{
      name,
      description,
      image: imageUrl
    }], { session });

    if (!category) throw new ErrorHandler("Category not created", 400);

    await session.commitTransaction();
    return category;

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const updateCategory = async (id: string, name?: string, description?: string, image?: Express.Multer.File) => {
  const updateCategoryData: any = {};

  if (name) updateCategoryData.name = name;
  if (description) updateCategoryData.description = description;
  if (image) {
    const imageUrl = await uploadSingleImageToCloudinary(image, "category", name);
    if (!imageUrl) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);
    updateCategoryData.image = imageUrl;
  }

  const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updateCategory, { new: true });
  if (updatedCategory._id.toString() !== id) throw new ErrorHandler("Category not found", 404);
  if (!updatedCategory) throw new ErrorHandler("Category not updated", 400);

  return updatedCategory;
};

export const deleteCategoryService = async (id: string) => {
  // Check if the category has any subcategories
  const subcategories = await SubCategoryModel.find({ 
    category: { $in: [id] } 
  }).countDocuments();

  // Check if the category is associated with any products
  const products = await ProductModel.find({ 
    category: { $in: [id] } 
  }).countDocuments();

  if (subcategories > 0 || products > 0) {
    throw new ErrorHandler("Category cannot be deleted as it is associated with subcategories or products", 400);
  }

  // Proceed to delete the category
  await CategoryModel.findByIdAndDelete(id);
};