import mongoose from "mongoose";
import { TProductDocument } from "../types/product.type.js";

const productSchema = new mongoose.Schema<TProductDocument>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: [String],
    default: [],
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    }
  ],
  unit: {
    type: String,
    default: "",
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  discount: {
    type: Number,
    default: null,
    trim: true,
  },
  moreDetails: {
    type: Object,
    default: {},
  },
  publish: {
    type: Boolean,
    default: true,
    trim: true,
  },
}, { timestamps: true })

const ProductModel = mongoose.models.Product || mongoose.model<TProductDocument>("Product", productSchema)

export default ProductModel