import { Request, Response, NextFunction } from "express";
import { CreateProductInput, GetProductByIdInput, SearchProductsInput, UpdateProductInput } from "../schema/product.schema.js";
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
      success: true,
      message: "Product created successfully",
    })
    
  } catch (error) {
    console.error('error', error);
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
    console.error("getAllProductssHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Get a product
 * @route   GET /api/v1/product/:id
 * @access  Public
 */
export const getProductHandler = async (req: Request<GetProductByIdInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const product = await ProductModel.findOne({_id: id}).populate('category subCategory');
    if(!product) throw new ErrorHandler("No product found", 404);

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    console.error("getProductHandler Error : ", error);
    next(error);
  }
}

/**
 * @desc    Get products by category
 * @route   GET /api/v1/product/category/:id
 * @access  Public
 */
export const getProductByCategory = async (req: Request<GetProductByIdInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    // const products = (await ProductModel.find({category: id}).populate('category subCategory').sort({ createdAt: -1 }).limit(15));
    const products = await ProductModel.find({
      category: {$in: id}
    }).populate('category subCategory').limit(15);
    if(!products) throw new ErrorHandler("No product found", 404);

    res.status(200).json({
      success: true,
      products,
    })
    
  } catch (error) {
    console.error("getProductByCategory Error : ", error);
    next(error);    
  }
}

/**
 * @desc    Get products by subCategory
 * @route   GET /api/v1/product/sub-category/:id
 * @access  Public
 */
export const getProductBySubCategory = async (req: Request<GetProductByIdInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params

    const products = await ProductModel.find({subCategory: id}).populate('category subCategory').sort({ createdAt: -1 }).limit(15);
    if(!products) throw new ErrorHandler("No product found", 404);

    res.status(200).json({
      success: true,
      products,
    })

  } catch (error) {
    console.error("getProductBySubCategory Error : ", error);
    next(error);
  }
} 

/**
 * @desc    Delete a product by ID.
 * @route   DELETE /api/v1/product/:id
 * @access  Private (requires authentication)
 */
export const deleteProductHandler = async (req: Request<GetProductByIdInput['params']>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    
    const deleteProduct = await ProductModel.findByIdAndDelete({_id: id});
    if(!deleteProduct) throw new ErrorHandler("No product found", 404);
    
    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    })
  } catch (error) {
    console.error("deleteProductHandler Error : ", error);
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


/**
 * @desc    Search products.
 * @route   GET /api/v1/product/search?search=flour,limit=10&page=5
 * @access  Public
 */
export const searchProductsHandler = async (req: Request<{}, {}, {}, SearchProductsInput["query"]>, res: Response, next: NextFunction) => {
  try {
    let { search, limit, page } = req.query;

    let limitNumber = Number(limit);
    let pageNumber = Number(page);

    if (!search) throw new ErrorHandler("Search query is required", 400);
    
    if (!pageNumber) {
      pageNumber = 1;
    } 
    
    if (!limitNumber) {
      limitNumber = 10;
    }

    const skip = (pageNumber-1) * limitNumber

    const [products , productCount] = await Promise.all([
      ProductModel.find(
        { $text: {$search: search as string } },
        { score: { $meta: "textScore" } }
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber)
      .populate('category subCategory'),
      
      ProductModel.countDocuments({ $text: { $search: search as string } })
    ])
    
    if(!products) throw new ErrorHandler("No product found", 404);
      
    res.status(200).json({
      success: true,
      products,
      productCount,
      totalPages: Math.ceil(productCount / limitNumber),
      page: pageNumber,
      limit: limitNumber
    });
  } catch (error) {
    console.error("searchProductsHandler Error : ", error);
    next(error);
  }
}
