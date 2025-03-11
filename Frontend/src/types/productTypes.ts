
export type TProduct = {
  more_details: any;
  _id: number,
  name: string,
  slug: string,
  price: number,
  description: string,
  category: {
    _id: number,
    name: string,
    description: string,
    image: string
  }[]
  discount: number,
  imageUrl: string[],
  published: boolean,
  stock: number,
  subCategory: [],
  unit: string,
  moreDetails: { [key: string]: string },
  updatedAt: string,
  __v: number,
}

export type TSearchResults = {
  limit: number,
  page: number,
  total: number,
  products: TProduct[],
  totalPages: number
}

export type TProductStore = {
  loading: boolean,
  products: TProduct[],
  product: TProduct | null,
  // allProducts: TProduct[],
  subCategoryProducts: TProduct[],
  categoryProducts: { [categoryId: string]: TProduct[] };
  getProductByCategory: (id: string) => Promise<void>
  getProductBySubCategory: (id: string) => Promise<void>
  getProductById: (id: string) => Promise<void>
  getSearchProducts: (input: string, page?: string, limit?: string) => Promise<TSearchResults>
  // getProducts: () => Promise<void>
}