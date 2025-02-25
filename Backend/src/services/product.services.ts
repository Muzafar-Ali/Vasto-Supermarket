import mongoose from "mongoose";
import ProductModel from "../models/product.model.js"
import uploadMultipleImagesToCloudinary from "../utils/uploadMultipleImagesToCloudinary.js";
import ErrorHandler from "../utils/errorClass.js";

type TCreateProduct = {
  name: string;
  description: string;
  category: string[];
  subCategory: string[];
  price: number;
  discount: number;
  unit: string;
  stock: number;
  published: boolean;
  // moreDetails: {
  // [key: string]: string
  // };
  moreDetails?: Record<string, string> | undefined;
}

type TUpdateProducts = Partial<TCreateProduct>

export const createProduct = async (productData: TCreateProduct, images: Express.Multer.File[]) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction(); // Start the transaction

    // Upload image to Cloudinary
    const imageUrls = await uploadMultipleImagesToCloudinary(images, "product", productData.name);
    if (!imageUrls) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);

    // Create the product in the database
    const newProduct = await ProductModel.create([{
      ...productData,
      imageUrl: imageUrls
    }], { session }); // Pass the session with the create operation

    if (!newProduct) throw new ErrorHandler("Product not created", 400);

    // Commit the transaction if everything is successful
    await session.commitTransaction();

    return newProduct; // Return the product to the controller

  } catch (error) {
    await session.abortTransaction(); // Rollback all changes in the transaction
    throw error; // Propagate the error to the controller
  } finally {
    session.endSession(); // End the session
  }
  
}

export const updateProduct = async (id: string, productData: TUpdateProducts, image?: Express.Multer.File[]) => {
  const updateProductData: any = {};

  // Conditionally add fields to updateProductData if they are present in productData
  if(productData?.name) updateProductData.name = productData.name; 
  if(productData?.description) updateProductData.description = productData.description;
  if(productData?.category) updateProductData.category = productData.category;
  if(productData?.subCategory) updateProductData.subCategory = productData.subCategory;
  if(productData?.price) updateProductData.price = productData.price;
  if(productData?.discount) updateProductData.discount = productData.discount;
  if(productData?.unit) updateProductData.unit = productData.unit;
  if(productData?.stock) updateProductData.stock = productData.stock;
  if(productData?.published) updateProductData.published = productData.published;
  if(productData?.moreDetails) updateProductData.moreDetails = productData.moreDetails;
  if(image) {
    const imageUrls = await uploadMultipleImagesToCloudinary(image, "product", productData?.name!);
    if (!imageUrls) throw new ErrorHandler("Failed to upload image to Cloudinary", 500);
    updateProductData.imageUrl = imageUrls;
  }

  const updateProduct = await ProductModel.findByIdAndUpdate(id, updateProductData, {new: true});
  if(updateProduct._id.toString() !== id) throw new ErrorHandler("Product not found", 404);
  if(!updateProduct) throw new ErrorHandler("Product not updated", 400);
  
  return updateProduct;
}