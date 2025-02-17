import mongoose from "mongoose";
import { TCategoryDocument } from "../types/category.type.js";

const categorySchema = new mongoose.Schema<TCategoryDocument>({
  name: {
    type: String,
    required: true,
    unique: true
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

const CategoryModel = mongoose.models.Category || mongoose.model<TCategoryDocument>("Category", categorySchema)

export default CategoryModel