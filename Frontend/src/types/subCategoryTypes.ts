

export type TSubCategory = {
  _id: string;
  name: string;
  slug: string
  description: string;
  image: string;
  category: string[];
}

export type TSubCategoryStore = {
  loading: boolean;
  subCategories: TSubCategory[];
  allSubCategories: TSubCategory[];
  getAllSubCategories: () => Promise<void>;
  getSubCategoryByCategoryId: (id: string) => Promise<void>;
}
