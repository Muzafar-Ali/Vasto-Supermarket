
export type TCategory = {
  _id: string;
  name: string;
  slug: string
  description: string;
  image: string;
}

export type TCategoryStory = {
  loading: boolean;
  categories: TCategory[];
  products: any[];
  getAllCategories: () => Promise<void>;
  getCategory: (id: number) => Promise<void>;
}