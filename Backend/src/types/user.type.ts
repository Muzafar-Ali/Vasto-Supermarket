import mongoose from "mongoose"

export type TUser = {
  name: string;
  email: string;
  password: string;
  avatar: string;
  mobile: number;
  refreshToken: string;
  verifyEmail: boolean;
  lastLoginDate: Date | undefined;
  status: string;
  address: mongoose.Schema.Types.ObjectId[];
  shoppingCart: mongoose.Schema.Types.ObjectId[];
  orderHistory: mongoose.Schema.Types.ObjectId[];
  forgotPasswordOtp: string;
  forgotPasswordExpiry: Date;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserDocument = TUser & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}; 