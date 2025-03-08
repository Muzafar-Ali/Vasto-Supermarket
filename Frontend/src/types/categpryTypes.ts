
export type TCategory = {
  _id: string;
  name: string;
  slug: string
  description: string;
  image: string;
}

export type TCategoryStore = {
  loading: boolean;
  categories: TCategory[];
  products: any[];
  getAllCategories: () => Promise<void>;
  getCategoryById: (id: number) => Promise<void>;
}