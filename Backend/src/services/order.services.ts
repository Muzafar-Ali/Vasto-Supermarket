import OrderModel from "../models/order.model.js";
import ProductModel from "../models/product.model.js";
import Stripe from "stripe";

export const createOrderFromSession = async (session: Stripe.Checkout.Session) => {
  console.log('session', session);
  console.log('session.metadata', session.metadata);
  
  const { userId, products, deliveryDetails, totalAmount } = session.metadata;

  const order = new OrderModel({
    // userId,
    products: JSON.parse(products).map((productId: string, quantity: string) => ({
      productId: productId,
      quantity: quantity
    })),
    deliveryDetails: JSON.parse(deliveryDetails),
    deliveryStatus: 'processing',
    totalAmount: parseFloat(totalAmount),
    // subTotalAmount:
    paymentId: session.payment_intent,
    paymentStatus: session.payment_status.toLowerCase(),
    // stripeSessionId: session.id
    orderId: session.id,
    // invoiceReceipt: 
  });

  await order.save();

    
  // Additional post-payment logic (send email, update inventory, etc.)
  
  // update inventory
  const updatedProducts = JSON.parse(products);
  
  for (const product of updatedProducts) {
    const { productId, quantity } = product;
    await ProductModel.findByIdAndUpdate(
      productId,
      { $inc: { stock: -quantity } }, // Decrease stock by quantity purchased
      { new: true }
    );
  }

}