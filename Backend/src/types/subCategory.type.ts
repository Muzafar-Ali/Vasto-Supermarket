import mongoose from "mongoose";

export type TSubCategory = {
  name: string;
  image: string;
  category: mongoose.Schema.Types.ObjectId[];
}

export type TSubCategoryDocument = TSubCategory & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}