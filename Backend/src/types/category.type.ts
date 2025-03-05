import mongoose from "mongoose";

export type TCategory = {
  name: string;
  slug: string;
  description: string;
  image: string;
}

export type TCategoryDocument = TCategory & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}