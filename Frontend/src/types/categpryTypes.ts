
export type TCategory = {
  id: number;
  name: string;
  description: string;
  image: string;
}

export type TCategoryStory = {
  loading: boolean;
  categories: TCategory[];
  getAllCategories: () => Promise<void>;
}