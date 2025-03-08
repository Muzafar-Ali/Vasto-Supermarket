
export type TProduct = {
  _id: number,
  name: string,
  price: number,
  description: string,
  image_url: string
  category: {
    _id: number,
    name: string,
    description: string,
    image: string
  }[]
  discount: number,
  imageUrl: string[],
  published: boolean,
  slug: string,
  stock: number,
  subCategory: [],
  unit: string,
  updatedAt: string,
  __v: number,
}

export type TProductStore = {
  loading: boolean,
  products: TProduct[],
  subCategoryProducts: TProduct[],
  categoryProducts: { [categoryId: string]: TProduct[] };
  getProductByCategory: (id: string) => Promise<void>
  getProductBySubCategory: (id: string) => Promise<void>
}