import { Request, Response, NextFunction } from "express";
import { CreateProductInput, GetProductInput, UpdateProductInput } from "../schema/product.schema.js";
import { createProduct, updateProduct } from "../services/product.services.js";
import ErrorHandler from "../utils/errorClass.js";
import ProductModel from "../models/product.model.js";

/**
 * @desc    Create new product.
 * @route   POST /api/v1/products
 * @access  Private (requires authentication)
 */
export const createProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response, next: NextFunction) => {
  try {
    const requestData = req.body
    const images = req.files as Express.Multer.File[];

    if (!images || images.length === 0) throw new ErrorHandler("No images uploaded", 400);

    // Call the service to create product
    await createProduct(requestData, images);

    res.status(201).json({
      message: "Product created successfully",
    })
    
  } catch (error) {
    console.log('error', error);
    next(error)

  }
}

/**
 * @desc    Get all products
 * @route   GET /api/v1/product
 * @access  Public
 */
export const getAllProductssHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const products = await ProductModel.find({}).sort({ createdAt: -1 }).populate('category subCategory');;
    if(!products) throw new ErrorHandler("No product found", 404);

    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    console.error("getAllSubCategoriesHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Get a product
 * @route   GET /api/v1/product/:id
 * @access  Public
 */
export const getProductHandler = async (req: Request<GetProductInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const products = await ProductModel.findOne({_id: id}).populate('category subCategory');
    if(!products) throw new ErrorHandler("No product found", 404);

    res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    console.error("getAllSubCategoriesHandler Error : ", error);
    next(error);
  }
}


/**
 * @desc    Delete a product by ID.
 * @route   DELETE /api/v1/product/:id
 * @access  Private (requires authentication)
 */
export const deleteProductHandler = async (req: Request<GetProductInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    const deleteProduct = await ProductModel.findByIdAndDelete({_id: id});
    if(!deleteProduct) throw new ErrorHandler("No product found", 404);
    
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error) {
    console.error("getAllSubCategoriesHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Update a product.
 * @route   PATCH /api/v1/product/:id
 * @access  Private (requires authentication)
 */
export const updateProductHandler = async(req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const requestData = req.body
    const image = req.files as Express.Multer.File[];

    const product = await ProductModel.findById({_id: id});
    if(!product) throw new ErrorHandler("No product found", 404);

    // Call the service to update product
    await updateProduct(id, requestData, image);

    res.status(201).json({
      message: "Product updated successfully",
    })
    
  } catch (error) {
    console.error("updateProductHandler Error : ", error);
    next(error);
  }
}
