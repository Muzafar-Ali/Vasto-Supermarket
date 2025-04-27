import mongoose from "mongoose";
import { TOrderDocument } from "../types/order.type.js";

const orderSchema = new mongoose.Schema<TOrderDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: String,
    required: [true, "order id is required"],
    unique: [true, "order id already exists" ]
  },
  products: [{
    _id: false,
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: String,
      required: true,
      min: 1
    }
  }],
  paymentId: {
    type: String,
    default:""
  },
  stripeSessionId: {
    type: String,
    default:""
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'pending', 'refunded'],
    default:'unpaid'
  },
  // deliveryAddress: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Address",
  // },
  deliveryDetails: {
    name: String,
    email: String,
    contact: String,
    address: String,
    state: String,
    country: String,
  },
  deliveryStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled', 'returned'],
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

const OrderModel = mongoose.models.Order || mongoose.model<TOrderDocument>("Order", orderSchema);

export default OrderModel;