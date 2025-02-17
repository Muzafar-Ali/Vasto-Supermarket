import mongoose from "mongoose";
import { TOrderDocument } from "../types/order.type.js";
import { object } from "zod";

const orderSchema = new mongoose.Schema<TOrderDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is missing"],
  },
  orderId: {
    type: String,
    required: [true, "order id is required"],
    unique: [true, "order id already exists" ]
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productDetails: {
    name: String,
    image: String,
  },
  paymentId: {
    type: String,
    default:""
  },
  paymentStatus: {
    type: String,
    default:""
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  subTotalAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  invoiceReceipt: {
    type: String,
    default: "",
  },
}, { timestamps: true })

const Order = mongoose.models.Order || mongoose.model<TOrderDocument>("Order", orderSchema);

export default Order;