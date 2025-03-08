import mongoose from "mongoose";
import { TProductDocument } from "../types/product.type.js";

const productSchema = new mongoose.Schema<TProductDocument>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
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
  published: {
    type: Boolean,
    default: true,
    trim: true,
  },
}, { timestamps: true })

productSchema.pre('save', function (next) {
  if (!this.slug) { 
    let slug = this.name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')      // Replace "&" with "and"
      .replace(/,/g, '')         // Remove commas
      .replace(/[^\w\s-]/g, '')  // Remove other special characters
      .replace(/\s+/g, '-');     // Replace spaces with hyphens

    this.slug = slug;
  }
  next();
});

const ProductModel = mongoose.models.Product || mongoose.model<TProductDocument>("Product", productSchema)

export default ProductModel