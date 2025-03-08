import mongoose, { mongo } from "mongoose";
import { TSubCategoryDocument } from "../types/subCategory.type.js";

const subCategorySchema = new mongoose.Schema<TSubCategoryDocument>({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  ],
}, {timestamps: true})

subCategorySchema.pre('save', function (next) {
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


const SubCategoryModel = mongoose.models.SubCategory || mongoose.model<TSubCategoryDocument>('SubCategory', subCategorySchema)

export default SubCategoryModel