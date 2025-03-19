'use client'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { useProductStore } from '@/store/prodcutStore'
import { useSubCategorytStore } from '@/store/subCategoryStore'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { use, useEffect } from 'react'

const ProductList = ({params}: {params: Promise<{ id: string, slug: string}>}) => {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const slug = resolvedParams?.slug; 
  const searchParams = useSearchParams();
  
  const { subCategoryProducts, getProductBySubCategory} = useProductStore();
  const { subCategories, getSubCategoryByCategoryId } = useSubCategorytStore();

  const subcategory = searchParams.get("subcategory");
  const subCatId = searchParams.get("subcatId");

  useEffect(() => {
    if (id) {
      const getSubCategories = async() => {
        await getSubCategoryByCategoryId(id);
        if (subcategory && subCatId) {
          await getProductBySubCategory(subCatId);
        }
      }
      getSubCategories();
    }
  }, [id]);
  
  return (
    <Wrapper className='sticky top-24 lg:top-20 pt-10'>
      <div className='sticky top-24 grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] py-2'> 

        {/* side bar- sub category dispaly */}
        <div className='min-h-[88vh] max-h-[88vh] overflow-y-scroll flex flex-col gap-3 shadow-md scrollbarCustom bg-white py-3 border'>
          { subCategories?.map((subCategory) => (
            <Link
              href={{
                pathname: `/productList/${slug}/${id}`,
                query: {
                  subcategory: subCategory.slug,  // Dynamic Subcategory Slug
                  subcatId: subCategory._id       // Dynamic Subcategory ID
                }
              }}
              key={subCategory._id} 
              onClick={async () => await getProductBySubCategory(subCategory._id)}
              className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 lg:gap-4 border-b box-border bg-white `}
            >
              <div className='w-fit mx-auto lg:mx-0 max-w-28 bg-white rounded-md box-border'>
                <Image src={subCategory.image} alt={subCategory.name} width={1000} height={1000} 
                className='w-14 lg:w-12 h-full lg:h-12 object-scale-down'/>
              </div>
              <div className='-mt-6 text-[11px] text-gray-700 font-light lg:font-medium text-center lg:text-left lg:text-sm'>{subCategory.name}</div>
            </Link>
          ))}
        </div>
        
        {/* product list display */}
        <div className='grid grid-cols-1 tablet-s:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4  bg-primary-base/5'>
          { subCategoryProducts?.map((product) => (
            <div key={product._id}>
              <ProductCard product={product}/>
            </div>
          ))}
        </div>

      </div>
    </Wrapper>
  )
}

export default ProductList