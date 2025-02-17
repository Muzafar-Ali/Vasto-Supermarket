import mongoose from "mongoose"

export type TProduct = {
  name: string;
  description: string;
  imageUrl: string[];
  categoryId: mongoose.Schema.Types.ObjectId[];
  subCategoryId: mongoose.Schema.Types.ObjectId[];
  unit: string;
  stock: number;
  price: number;
  discount: number;
  moreDetails: object;
  publish: boolean;
}

export type TProductDocument = TProduct & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}