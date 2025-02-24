import mongoose, { mongo } from "mongoose";
import { TSubCategoryDocument } from "../types/subCategory.type.js";

const subCategorySchema = new mongoose.Schema<TSubCategoryDocument>({
  name: {
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
  image: {
    type: String,
    required: true
  }
}, {timestamps: true})

const SubCategoryModel = mongoose.model<TSubCategoryDocument>('SubCategory', subCategorySchema)

export default SubCategoryModel