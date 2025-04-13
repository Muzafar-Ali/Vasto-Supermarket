import mongoose from "mongoose";
import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import Stripe from "stripe";

type TMetadata = {
  userId?: string;
  products: string; // JSON string
  deliveryDetails: string; // JSON string
  totalAmount: string; // string, needs parsing
};

export const createOrderFromSession = async (stripeSession: Stripe.Checkout.Session, stripe: Stripe) => {
  const dbSession = await mongoose.startSession();
  
  try {
    dbSession.startTransaction();

    const { userId, products, deliveryDetails, totalAmount } = stripeSession.metadata as TMetadata;

    // Fetch invoice if exists
    let invoiceNumber = null;
    let invoicePdfUrl = null;
    if (stripeSession.invoice) {
      const invoice = await stripe.invoices.retrieve(stripeSession.invoice as string);
      invoiceNumber = invoice.number;
      invoicePdfUrl = invoice.invoice_pdf;
    }

    const parsedProducts = JSON.parse(products) as Array<{
      productId: string;
      quantity: string;
    }>;

    // Create order
    const order = new OrderModel({
      userId,
      products: parsedProducts.map(item => ({
        productId: item.productId,
        quantity: parseInt(item.quantity)
      })),
      deliveryDetails: JSON.parse(deliveryDetails),
      deliveryStatus: 'processing',
      totalAmount: parseFloat(totalAmount),
      paymentId: stripeSession.payment_intent,
      paymentStatus: stripeSession.payment_status.toLowerCase(),
      orderId: stripeSession.id,
      invoiceReceipt: invoicePdfUrl
    });

    await order.save({ session: dbSession });

    // Update inventory in transaction
    for (const product of parsedProducts) {
      await ProductModel.findByIdAndUpdate(
        product.productId,
        { $inc: { stock: -parseInt(product.quantity) } },
        { new: true, session: dbSession }
      );
    }

    await dbSession.commitTransaction();
  } catch (error) {
    await dbSession.abortTransaction();
    console.error('Order creation failed:', error);
    throw error; // Re-throw to be caught by the webhook handler
  } finally {
    dbSession.endSession();
  }
};