import mongoose from "mongoose";
import { TCartItemDocument } from "../types/cartItem.type.js";

const productSchema = new mongoose.Schema<TCartItemDocument>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  }
},{ timestamps: true })

const CartItemModel = mongoose.models.CartItem || mongoose.model<TCartItemDocument>("CartItem", productSchema)

export default CartItemModel
