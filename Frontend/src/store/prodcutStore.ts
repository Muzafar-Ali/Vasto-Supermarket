import { config } from "@/config/config";
import { TProductStore } from "@/types/productTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useProductStore= create<TProductStore>((set) => ({
  loading: false,
  products: [],
  subCategoryProducts: [],
  categoryProducts: {},
  getProductByCategory: async (id) => {
    try {      
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/category/${id}`);
      const data = response.data;
      if (data.success) {
        set((state) => ({
          categoryProducts: {
            ...state.categoryProducts,
            [id]: data.products,
          },
        }))
        set({ products: data.products });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);      
    } finally{
      set({ loading: false });

    }
  },
  getProductBySubCategory: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/sub-category/${id}`);
      const data = response.data;
      if (data.success) {
        set({ subCategoryProducts: data.products });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally{
      set({ loading: false });

    }
  }
}))