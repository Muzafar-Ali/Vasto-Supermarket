import mongoose from "mongoose"

export type TOrder = {
  userId: mongoose.Schema.Types.ObjectId;
  orderId: string;
  products: {
    productId: mongoose.Schema.Types.ObjectId,
    quantity: string,
  }[];
  paymentId: string;
  paymentStatus: 'unpaid' | 'paid' | 'pending' | 'refunded';
  deliveryAddress: Object;
  deliveryStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  deliveryDetails: Object;
  subTotalAmount: number;
  totalAmount: number;
  invoiceReceipt: string;
}

export type TOrderDocument = TOrder & mongoose.Document & {
  createdAt: Date;
  updatedAt: Date;
}