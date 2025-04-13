import { config } from "@/config/config";
import { TProductStore } from "@/types/productTypes";
import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const baseURI = config.baseUri

export const useProductStore= create<TProductStore>((set) => ({
  loading: false,
  products: [],
  product: null,
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
  // getSearchProducts: async (input, page, limit) => {
  //   try {
  //     set({ loading: true });

  //     const response = await axios.get(`${baseURI}/api/v1/product/search?search=${input}&${page}&${limit}`);
  //     const data = response.data;
      
  //     if (data.success) {
        
  //       // Store the search query in localStorage
  //       let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
        
  //       if (!Array.isArray(recentSearches)) {
  //         recentSearches = [];
  //       }

  //        // Avoid duplicates
  //       if (!recentSearches.includes(input)) {
  //         recentSearches.unshift(input); // Add new search at the beginning

  //         // Keep only the latest 5 searches
  //         if (recentSearches.length > 5) {
  //           recentSearches.pop();
  //         }
  //       }
  //       localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

  //       return data;

  //     }

  //     return; 

  //   } catch (error) {
  //     console.error("Error fetching Product By Id:", error);
  //   } finally{
  //     set({ loading: false });

  //   }
  // }

  getSearchProducts: async (input, page = "1", limit = "10") => {
    
    try {
      set({ loading: true });
      const response = await axios.get(`${baseURI}/api/v1/product/search?search=${input}&page=${page}&limit=${limit}`);
      const data = response.data;

      if (data.success) {
          // Only store search if results were found
        if (data.products.length > 0 ){
          // Get recent searches from localStorage or initialize empty array
          let recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
          
          // Ensure we're working with an array (safety check)
          if (!Array.isArray(recentSearches)) {
            recentSearches = [];
          }

          // Add new search term if not already present (avoid duplicates)
          if (!recentSearches.includes(input)) {
            recentSearches.unshift(input);
            // Keep only 5 most recent searches
            if (recentSearches.length > 5) {
              recentSearches.pop();
            }
          }
          
          localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
        }

        return data;
      }

      return;
      
    } catch (error) {
      console.error("Error fetching Product By Id:", error);
    } finally {
      set({ loading: false });
    }
  },
  addProduct: async (data) => {
    try {
      set({ loading: true });

      const response = await axios.post(`${baseURI}/api/v1/product`, data);
      const responseData = response.data;
      
      if (responseData.success) {
        toast.success(responseData.message)
      }
      return responseData.success;
      
    } catch (error) {
      console.error("Error adding product:", error);
      return false; // Ensure a boolean is always returned
    } finally {
      set({ loading: false });
    }
  },
  
}))