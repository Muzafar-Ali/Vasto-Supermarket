import { config } from "@/config/config";
import { TProductStore } from "@/types/productTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useProductStore= create<TProductStore>((set) => ({
  loading: false,
  products: [],
  product: null,
  subCategoryProducts: [],
  searchedProducts: [],
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
      console.error("Error fetching product by category:", error);      
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
      console.error("Error fetching product by sub-category:", error);
    } finally{
      set({ loading: false });

    }
  },
  getProductById: async (id) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/${id}`);
      const data = response.data;
      if (data.success) {
        set({ product: data.product });
      }
    } catch (error) {
      console.error("Error fetching Product By Id:", error);
    } finally{
      set({ loading: false });

    }
  },
  getSearchProducts: async (input, page, limit) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/search?search=${input}&${page}&${limit}`);
      const data = response.data;
      if (data.success) {
        set({ searchedProducts: data.products });
      }
    } catch (error) {
      console.error("Error fetching Product By Id:", error);
    } finally{
      set({ loading: false });

    }
  }
}))