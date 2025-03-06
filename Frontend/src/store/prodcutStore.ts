import { config } from "@/config/config";
import { TProductStore } from "@/types/productTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useProductStore= create<TProductStore>((set) => ({
  loading: false,
  products: [],
  categoryProducts: {},
  getProductByCategory: async (id) => {
    try {      
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/category/${id}`);
      const data = response.data;
      set((state) => ({
        categoryProducts: {
          ...state.categoryProducts,
          [id]: data.products,
        },
      }))
      set({ products: data.products });
    } catch (error) {
      console.error("Error fetching categories:", error);      
    } finally{
      set({ loading: false });

    }
  },
}))