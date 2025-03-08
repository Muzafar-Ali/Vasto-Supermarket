import mongoose from "mongoose";
import { TCategoryDocument } from "../types/category.type.js";

const categorySchema = new mongoose.Schema<TCategoryDocument>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  slug: {
    type: String,
    slug: 'name',
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true })

categorySchema.pre('save', function (next) {
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

const CategoryModel = mongoose.models.Category || mongoose.model<TCategoryDocument>("Category", categorySchema)

export default CategoryModel