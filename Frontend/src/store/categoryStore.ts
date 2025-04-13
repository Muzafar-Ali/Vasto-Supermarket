import { config } from "@/config/config";
import { TCategoryStore } from "@/types/categpryTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useCategoryStore = create<TCategoryStore>((set) => ({
  loading: false,
  categories: [],
  subCategories: [],

  getAllCategories: async () => {    
    try {
      // Only fetch if we don't have data already
      if (useCategoryStore.getState().categories.length === 0) {
        set({ loading: true });
        const response = await axios.get(`${baseURI}/api/v1/category`);
        const data = response.data;
        
        if (data.success) {
          set({ categories: data.categories });
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ loading: false });
    }
  }, 
  getCategoryById: async (id: number) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/category/${id}`);
      const data = response.data;
      if (data.success) {
        set({ categories: data.categories });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ loading: false });
    }
  },
}))