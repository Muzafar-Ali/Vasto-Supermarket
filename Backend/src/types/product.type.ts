import mongoose from "mongoose"

export type TProduct = {
  name: string;
  description: string;
  imageUrl: string[];
  category: mongoose.Schema.Types.ObjectId[];
  subCategory: mongoose.Schema.Types.ObjectId[];
  unit: string;
  stock: number;
  price: number;
  discount: number;
  moreDetails: object;
  published: boolean;
}

export type TProductDocument = TProduct & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}