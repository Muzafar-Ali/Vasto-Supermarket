import mongoose from "mongoose";

export type TSubCategory = {
  name: string;
  image: string;
  categoryId: mongoose.Schema.Types.ObjectId[];
}

export type TSubCategoryDocument = TSubCategory & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}