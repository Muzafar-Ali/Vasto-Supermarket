import mongoose from "mongoose"
import { number } from "zod";

export type TOrder = {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: string;
  productId: mongoose.Schema.Types.ObjectId;
  productDetails: mongoose.Schema.Types.ObjectId[];
  paymentId: string;
  paymentStatus: 'unpaid' | 'paid' | 'pending' | 'refunded';
  deliveryAddress: Object;
  deliveryStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  subTotalAmount: number;
  totalAmount: number;
  invoiceReceipt: string;
}

export type TOrderDocument = TOrder & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}