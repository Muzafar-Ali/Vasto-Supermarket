import { config } from "@/config/config";
import { TSubCategoryStore } from "@/types/subCategoryTypes";
import axios from "axios";
import { create } from "zustand";

const baseURI = config.baseUri

export const useSubCategorytStore= create<TSubCategoryStore>((set) => ({
  loading: false,
  subCategories: [],
  allSubCategories: [],
  getAllSubCategories: async() => {
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/sub-category`);
      const data = response.data;
      if (data.success) {
        set({ allSubCategories: data.subCategories });
      }
    } catch (error) {
      console.error("Error fetching sub categories:", error);
    } finally{
      set({ loading: false });
    }
  },
  getSubCategoryByCategoryId: async (id) => {
    try {      
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/sub-category/${id}`);
      const data = response.data;
      if (data.success) {
        set({ subCategories: data.subCategories });
      }
    } catch (error) {
      console.error("Error fetching sub categories:", error);      
    } finally{
      set({ loading: false });
    }
  },
}))