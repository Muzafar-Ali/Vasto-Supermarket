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

// create index named text
// productSchema.index({
//   name: 'text',
//   description: 'text',
// }, {
//   weights: {
//     name: 5,
//     description: 1,
//   },
// })

productSchema.index(
  {
    name: 'text',
    description: 'text',
    'moreDetails.Key Features': 'text',
    'moreDetails.Flavour': 'text',
    'moreDetails.Type': 'text',
  },
  {
    weights: {
      name: 10,                          // Highest priority
      description: 3,                    // Medium priority
      'moreDetails.Key Features': 2,     // Useful for product highlights
      'moreDetails.Flavour': 2,          // For food/products with flavors
      'moreDetails.Type': 1,             // E.g., "Inhaler", "Atta"
    },
    name: 'product_search_index'         // Name the index
  }
);

const ProductModel = mongoose.models.Product || mongoose.model<TProductDocument>("Product", productSchema)

export default ProductModel