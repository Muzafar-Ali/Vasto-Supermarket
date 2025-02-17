import mongoose from "mongoose";

export type TCartItem = {
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export type TCartItemDocument = TCartItem & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}