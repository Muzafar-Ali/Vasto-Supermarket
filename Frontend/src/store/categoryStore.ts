import { config } from "@/config/config";
import { TCategoryStory } from "@/types/categpryTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useCategoryStore = create<TCategoryStory>((set) => ({
  loading: false,
  categories: [],
  subCategories: [],
  products: [],

  getAllCategories: async () => {    
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/category`);
      const data = response.data;
      set({ categories: data.categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ loading: false });
    }
  }, 
  getCategory: async (id: number) => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/category/${id}`);
      const data = response.data;
      set({ products: data.categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      set({ loading: false });
    }
  },
}))