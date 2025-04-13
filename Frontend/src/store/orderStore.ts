import { config } from "@/config/config"
import { TOrderState } from "@/types/orderTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand"

const baseURI = config.baseUri

export const useOrderStore= create<TOrderState>((set) => ({
  loading: false,
  createStripeCheckoutSession: async (orderData) => {    
    try {
      set({ loading: true });
      const response = await axios.post(`${baseURI}/api/v1/order/payment/create-checkout-session`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      })
      console.log('response.data', response.data);
      
      if (response.data.success) {
        toast.success(response.data.message);
      }
    
      window.location.href = response.data.url;
    
    } catch (error) {
      console.error("Error creating checkout session:", error);
      console.error(error)
    } finally {
      set({ loading: false });
    }
  }
}))