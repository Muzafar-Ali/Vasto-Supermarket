export type TCheckoutSessionRequest = {
  cartItems: {
    _id: string;
    name: string;
    imageUrl: string;
    // category: string[];
    // subCategory: string[];
    unit: string;
    stock: number;
    price: number;
    discount: number;
    slug: string;
    quantity: number;
  }[];
  deliveryDetails:{
    name:string;
    email:string;
    contact:string;
    address:string;
    city:string;
    country:string
  },
  restaurantId:string;
  totalAmount:string;
}

export type TOrderState = {
  loading: boolean;
  createStripeCheckoutSession: (checkoutSessionRequest: any) => Promise<void>;
}