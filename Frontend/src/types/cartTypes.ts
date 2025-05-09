import { TProduct } from "./productTypes";

export type TCartItem = TProduct & {
  quantity: number
}

// export type TCart = {
//   cart: TCartItem[],
//   total: number,
//   totalItems: number,
//   shippingCharge: number,
//   discount: number,
//   grandTotal: number
// }

export type TCartStore = {
  cart: TCartItem[],
  loading: boolean,
  isCartOpen: boolean,
  totalItems: number,
  
  // cart: TCar
  addToCart: (product: TProduct) => void,
  increaseQuantity: (product: TProduct) => void,
  decreaseQuantity: (product: TProduct) => void,
  setIsCartOpen: (value: boolean) => void
  clearCart: () => void,
  // removeFromCart: (product: TProduct) => void,
  // getCart: () => void,
  // getCartTotal: () => void

}