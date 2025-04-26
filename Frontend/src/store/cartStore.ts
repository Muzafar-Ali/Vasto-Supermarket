import { TCartItem, TCartStore } from "@/types/cartTypes";
import { toast } from "react-toastify";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCartStore = create<TCartStore>()(
  persist((set) => ({
    cart: [],
    loading: false,
    isCartOpen: false,
    totalItems: 0,
    addToCart: (product) => {
      set({ loading: true })
      try {
        set((state) => {
          const existingProduct = state.cart.find((item: TCartItem) => item._id === product._id);
    
          if(existingProduct) {
            existingProduct.quantity += 1;
          } else {
            state.cart.push({ ...product, quantity: 1 });
          }
          // Recalculate total items in the cart
          const totalQuantity = state.cart.reduce((total: number, item: TCartItem) => total + item.quantity, 0);
          
          toast.success(`product added to cart`)
          return {
            cart: state.cart,
            totalItems: totalQuantity,
            // isAlreadyAdded: true
          };
        })
        
      } catch (error) {
        console.error(error)
      } finally {
        set({ loading: false })
      }
    }, 
    increaseQuantity: (product) => {
      try {
        set({ loading: true });
        
        set((state) => {
          const existingProduct = state.cart.find((item: TCartItem) => item._id === product._id);
    
          if(existingProduct) {
            existingProduct.quantity += 1;
          }

          // Recalculate total items in the cart
          const totalQuantity = state.cart.reduce((total: number, item: TCartItem) => total + item.quantity, 0);
    
          return {
            cart: state.cart,
            totalItems: totalQuantity,
            // isAlreadyAdded: true
          };
        })

      } catch (error) {
        console.error(error)
      } finally{
        set({ loading: false })
      }
    },
    decreaseQuantity: (product) => {
      try {
        set({ loading: true });

        set((state) => {
          // Update cart: decrease quantity if product matches, remove if quantity <= 0
          const updatedCart = state.cart
            .map((item) => item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter((item) => item.quantity > 0); // Remove items with quantity 0
          
          // Recalculate total items in the cart
          const totalQuantity = updatedCart.reduce((total, item) => total + item.quantity, 0 );
    
          return { 
            cart: updatedCart, 
            totalItems: totalQuantity 
          };
        });
        
      } catch (error) {
        console.error(error);
      } finally {
        set({ loading: false })
      }
    },
    setIsCartOpen: (value) => {
      set({ isCartOpen: value })
    },
    clearCart: () => {
      set({ 
        cart: [], 
        totalItems: 0,
        loading: false,
        isCartOpen: false 
      });
    },

  }), {
    name: 'cart',
    storage: createJSONStorage(() => localStorage)
})
)
