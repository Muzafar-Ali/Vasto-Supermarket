import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { TCheckoutSessionRequest } from "@/types/orderTypes";
import priceWithDiscount from "@/utils/priceWithDiscount";
import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "../ui/separator";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { emirates } from "@/constants/emirates";

const CheckoutConfirm = ({open, setOpen}: {open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
  const { cart } = useCartStore();
  const { createStripeCheckoutSession, loading } = useOrderStore();
  
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    emirate: "",
    // country: "United Arab Emirates" // default value
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const orderData: TCheckoutSessionRequest = {
        cartItems: cart.map((cartItem) => ({
          _id: cartItem._id,
          name: cartItem.name,
          slug: cartItem.slug,
          imageUrl: cartItem.imageUrl[0],
          unit: cartItem.unit,
          stock: cartItem.stock,
          price: priceWithDiscount(cartItem.price, cartItem.discount).toString(),
          quantity: cartItem.quantity.toString(),
          discount: cartItem.discount,
        })),

        deliveryDetails: {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
          emirate: formData.emirate,
          // country: formData.country
        },
        
        totalAmount: cart.reduce((acc, cartItem) => {
          return acc + priceWithDiscount(cartItem.price, cartItem.discount) * cartItem.quantity;
        }, 0).toString(),
      };
      
      await createStripeCheckoutSession(orderData);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className={`bg-white w-full h-full transition-transform duration-300 ease-in-out ${
      open ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="flex items-center justify-between py-4 bg-primary-base text-white">
        <button onClick={() => setOpen(false)} aria-label="Close checkout" className="flex items-center justify-between">
        <HiOutlineChevronLeft size={20}/>
        <span className="text-base font-semibold">Back</span> 
          {/* <IoClose size={25}/> */}
        </button>
      </div>
      <Separator/>

      <h3 className="text-base font-semibold mt-5 p-2">Shipping Information</h3>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="delivery-name" className="block text-sm font-medium text-primary-base">
              Name
            </label>
            <input
              type="text"
              id="delivery-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="delivery-email" className="block text-sm font-medium text-primary-base">
              Email
            </label>
            <input
              type="email"
              id="delivery-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Contact Field */}
          <div className="mb-4">
            <label htmlFor="delivery-contact" className="block text-sm font-medium text-primary-base">
              Contact No.
            </label>
            <input
              type="tel"
              id="delivery-contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* Address Field */}
          <div className="mb-4">
            <label htmlFor="delivery-address" className="block text-sm font-medium text-primary-base">
              Address
            </label>
            <input
              type="text"
              id="delivery-address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>

          {/* State Field */}
          <div className="mb-4">
            <label htmlFor="delivery-emirate" className="block text-sm font-medium text-primary-base">
              Emirate
            </label>
            <select
              id="delivery-emirate"
              name="emirate"
              value={formData.emirate}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded-md w-full bg-primary-base-3"
              required
            >
              <option value="">Select an Emirate</option>
              {
                emirates.map((emirate, index) => (
                  <option key={index} value={emirate}>{emirate}</option>
                ))
              }
            </select>
          </div>

          <button 
            type="submit"
            className="bg-primary-base text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CheckoutConfirm