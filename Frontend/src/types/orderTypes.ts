// Cart Item Type
export type TCartItem = {
  _id: number;
  name: string;
  imageUrl: string;
  unit: string;
  stock: number;
  price: string;
  discount: number;
  slug: string;
  quantity: string;
};

// Delivery Details Type
export type TDeliveryDetails = {
  name: string;
  email: string;
  contact: string;
  address: string;
  emirate: string;
};

// Checkout Session Request Type (composed of the above)
export type TCheckoutSessionRequest = {
  cartItems: TCartItem[];
  deliveryDetails: TDeliveryDetails;
  totalAmount: string;
};

export type TOrderState = {
  loading: boolean;
  createStripeCheckoutSession: (checkoutSessionRequest: TCheckoutSessionRequest) => Promise<void>;
}