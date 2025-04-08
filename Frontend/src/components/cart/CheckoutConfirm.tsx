import { useCartStore } from "@/store/cartStore"
import { useOrderStore } from "@/store/orderStore";
import { AlertDialog, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { AlertDialogContent, AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import priceWithDiscount from "@/utils/priceWithDiscount";

const CheckoutConfirm = ({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
  const { cart } = useCartStore();
  const { createStripeCheckoutSession, loading } = useOrderStore();

  const deliveryData = {
    name: "full name",
    email:  "abc@abc.com",
    contact: "123464787",
    address: "123456 street",
    state: "Dubai",
    country: "Emarat",
  }
  
  const checkoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const orderData = {
        cartItems: cart.map((cartItem) => ({
          _id: cartItem._id,
          name: cartItem.name,
          slug: cartItem.slug,
          imageUrl: cartItem.imageUrl[0],
          // category: string[];
          // subCategory: string[];
          unit: cartItem.unit,
          stock: cartItem.stock,
          price: priceWithDiscount(cartItem.price, cartItem.discount).toString(),
          quantity: cartItem.quantity.toString(),
          discount: cartItem.discount,
          // totalAmount: (cartItem.price * cartItem.quantity).toString(),
        })),

        deliveryDetails: deliveryData,
        totalAmount: cart.reduce((acc, cartItem) => {
          return acc + priceWithDiscount(cartItem.price, cartItem.discount) * cartItem.quantity;
        }, 0).toString(),
      }
      await createStripeCheckoutSession(orderData);
    
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
console.log(open);

  return (
    <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
          {/* <form onSubmit={checkoutHandler} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
            <label htmlFor="">Name</label>
            <input type="text" className="border rounded-lg p-2" />
            <label htmlFor="">Email</label>
            <input type="text" className="border rounded-lg p-2" />
            <label htmlFor="">Phone</label>
            <input type="text" className="border rounded-lg p-2" />
            <label htmlFor="">Address</label>
            <input type="text" className="border rounded-lg p-2" /> */}
            <button onClick={checkoutHandler}>
              continue
            </button>
          {/* </form> */}
    </div>
  )
}

export default CheckoutConfirm