import CategoryModel from "../models/category.model.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary.js";
import ErrorHandler from "../utils/errorClass.js";
import mongoose from "mongoose";
import SubCategoryModel from "../models/subCategory.js";
import ProductModel from "../models/product.model.js";


export const addCategory = async (name: string, description: string, image: Express.Multer.File) => {
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction(); // Start the transaction

    // Check if category already exists
    const categoryExists = await CategoryModel.findOne({ name }).session(session);
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

    return category; // Return the created category to the controller

  } catch (error) {
    await session.abortTransaction(); // Rollback all changes in the transaction
    throw error; // Propagate the error to the controller
  } finally {
    session.endSession(); // End the session
  }
};

export const updateCategory = async (id: string, name?: string, description?: string, image?: Express.Multer.File) => {
  const updateCategoryData: any = {};

  if (name) updateCategoryData.name = name;
  if (description) updateCategoryData.description = description;
  if (image) {
    const imageUrl = await uploadImageToCloudinary(image, "category");
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