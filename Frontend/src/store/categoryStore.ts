import { config } from "@/config/config";
import { TCategoryStory } from "@/types/categpryTypes";
import axios from "axios";
import { create } from "zustand";

export const useCategoryStore = create<TCategoryStory>((set) => ({
  loading: false,
  categories: [],

  getAllCategories: async () => {
    const baseURI = config.baseUri
    
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
  }
}))