import mongoose, { mongo } from "mongoose";
import { TSubCategoryDocument } from "../types/subCategory.type.js";

const subCategorySchema = new mongoose.Schema<TSubCategoryDocument>({
  name: {
    type: String,
    required: true
  },
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  ],
  image: {
    type: String,
    required: true
  }
}, {timestamps: true})

const SubCategory = mongoose.model<TSubCategoryDocument>('SubCategory', subCategorySchema)

export default SubCategory