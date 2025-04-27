import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import config from "../config/confiq.js";
import ErrorHandler from "../utils/errorClass.js";
import OrderModel from "../models/order.model.js";
import { createOrderFromSession } from "../services/order.services.js";
import { OrderIdInput, OrderRequest } from "../schema/order.schema.js";

const stripe = new Stripe(config.stripeSecretKey as string);

/**
 * @desc    Create a Stripe checkout session for order payment
 * @route   POST /api/v1/order/payment/create-checkout-session
 * @access  Private (requires authentication)
 */
export const createCheckoutSessionHandler = async (req: Request<{}, {}, OrderRequest["body"]>, res: Response, next: NextFunction) => {
  try {
    const { cartItems, deliveryDetails, totalAmount, userId } = req.body;
    
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
          images: [item.imageUrl],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session with configured options
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["AE"],
      },
      invoice_creation: {
        enabled: true
      },
      success_url: `${config.clientUrl}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.clientUrl}/checkout-failed`,
      metadata: {
        ...(userId && {userId}),
        products: JSON.stringify(cartItems.map((item: any) => ({
          productId : item._id,
          quantity : item.quantity
        }))),
        deliveryDetails: JSON.stringify(deliveryDetails),
        totalAmount: totalAmount.toString()
      },
    });

    if(!session.url) throw new ErrorHandler("Error creating checkout session", 500);    
    
    res.status(200).json({ 
      success: true,
      message: "Checkout session created successfully",
      url: session.url
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Handle Stripe webhook events for payment processing
 * @route   POST /api/v1/stripe/webhook
 * @access  Public (called by Stripe, not by client directly)
 */
// export const stripeWebhookHandler = async ( req: Request, res: Response): Promise<void> => { // Explicitly return Promise<void>
//   const sig = req.headers['stripe-signature'] as string;

//   try {
//     const event = stripe.webhooks.constructEvent( req.body, sig, config.stripeWebhookSecret as string );

//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object;    

//       // Only create order if payment was successful
//       if (session.payment_status === 'paid') {
//         await createOrderFromSession(session, stripe);
//       }
//     }

//     res.json({ received: true }); // Final response
//   } catch (error: any) {
//     console.error('Webhook Error:', error.message);
//     res.status(400).json({ error: `Webhook Error: ${error.message}` }); 
//     return;
//   }
// };
export const stripeWebhookHandler = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'] as string;
  console.log('Webhook received - raw body:', req.body); // Add this

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, config.stripeWebhookSecret as string);
    console.log('Event constructed:', event.type); // Add this

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Session details:', JSON.stringify(session, null, 2)); // Detailed session log

      if (session.payment_status === 'paid') {
        console.log('Attempting to create order...');
        await createOrderFromSession(session, stripe);
        console.log('Order creation completed');
      }
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    console.error('Stack trace:', error.stack); // Add stack trace
    res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }
};

/**
 * @desc    Get all orders with populated product details
 * @route   GET /api/v1/order/all
 * @access  Private (requires authentication, typically admin-only)
 */
export const getOrdersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderModel.find().populate({
      path: "products.productId", 
      select:[ "name", "imageUrl", "unit", "stock", "discount", "price"]
    });
    
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc    Get order id
 * @route   GET /api/v1/order/:sessionId
 * @access  Public 
 */
export const getOrderIdHandler = async (req: Request< OrderIdInput['params']>, res: Response, next: NextFunction) => {
  try {
    const {sessionId} = req.params;

    const order = await OrderModel.findOne({ stripeSessionId: sessionId });
    
    if(!order) throw new ErrorHandler("Order not found", 404);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      orderId: order.orderId
    });
  } catch (error) {
    next(error);
  }
}