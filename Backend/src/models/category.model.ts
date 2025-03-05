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
  if (!this.slug) { // Only set slug if it's not already provided
    let slug = this.name.toLowerCase().replace(/\s+/g, '-');
    this.slug = slug;
  }
next();
})


const CategoryModel = mongoose.models.Category || mongoose.model<TCategoryDocument>("Category", categorySchema)

export default CategoryModel