'use client'
import ProductCard from '@/components/ProductCard'
import Wrapper from '@/components/Wrapper'
import { useProductStore } from '@/store/prodcutStore'
import { useSubCategorytStore } from '@/store/subCategoryStore'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductList = ({params}: {params: Promise<{ id: string, slug: string}>}) => {

  const searchParams = useSearchParams();

  const { subCategoryProducts, categoryProducts, getProductBySubCategory, getProductByCategory } = useProductStore();
  const { subCategories, getSubCategoryByCategoryId } = useSubCategorytStore();
 
  // State to hold resolved route parameters (from async promise)
  const [resolvedParams, setResolvedParams] = useState<{id: string, slug: string}>();
 
  // Extract ID and slug from resolved params
  const id = resolvedParams?.id;
  const slug = resolvedParams?.slug; 
  
  const subcategory = searchParams.get("subcategory");
  const subCatId = searchParams.get("subcatId");

  /**
   * Effect to resolve async route parameters and fetch data
   * Runs when the params prop changes
   */
  useEffect(() => {
    const fetchData = async () => {
      const resolvedParams = await params;
      setResolvedParams(resolvedParams);
    };
    fetchData();
  }, [params])

  useEffect(() => {
    if (id) {
      const getCategoryProducts = async () => {
        await Promise.all([getSubCategoryByCategoryId(id), getProductByCategory(id)]);
      }
      getCategoryProducts();
    }
  },[id])

  useEffect(() => {
    if (subcategory && subCatId) {
      const getSub = async () => {
        await Promise.all([getProductBySubCategory(subCatId)]);
      }
      getSub();
    }
  },[subcategory, subCatId])
  
  return (
    <Wrapper className='pt-5 lg:pt-10 bg-primary-base/5'>
      <div className='grid grid-cols-[80px_1fr] md:grid-cols-[160px_1fr] lg:grid-cols-[270px_1fr] py-2'> 

        {/* Sidebar - Subcategory navigation */}
        <div className='sticky top-20 min-h-[88vh] max-h-[88vh] overflow-y-scroll flex flex-col gap-3 shadow-md scrollbarCustom bg-white py-3 border'>
          { subCategories?.map((subCategory) => (
            <Link
              href={{
                pathname: `/productList/${slug}/${id}`,
                query: {
                  subcategory: subCategory.slug,  
                  subcatId: subCategory._id       
                }
              }}
              key={subCategory._id} 
              className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 lg:gap-4 border-b box-border bg-white `}
            >
              <div className='w-fit mx-auto lg:mx-0 max-w-28 bg-white rounded-md box-border'>
                <Image src={subCategory.image} alt={subCategory.name} width={1000} height={1000} 
                className='w-14 lg:w-12 h-full lg:h-12 object-scale-down'/>
              </div>
              <div className='relative bg-white md:py-1 -mt-6 text-[11px] text-gray-700 font-light lg:font-medium text-center lg:text-left lg:text-sm'>{subCategory.name}</div>
            </Link>
          ))}
        </div>
        
        {/* Product list display area */}
        {/* Conditional rendering based on whether subcategory is selected */}
        { subCategoryProducts.length > 0 && subcategory && subCatId ? (
          <div className='sticky top-20 min-h-[88vh] max-h-[88vh] overflow-y-auto grid mobile-l:grid-cols-2 min-[470px]:grid-cols-2 tablet-s:grid-cols-3 lg:grid-cols-4 gap-2 tablet-s:gap-4 p-2 tablet-s:p-4 bg-primary-base/5'>
          {/* Map through filtered subcategory products */}
          { subCategoryProducts?.map((product) => (
            <div key={product._id}>
              <ProductCard product={product}/>
            </div>
          ))}
        </div>

        ): (
          <div className='sticky top-24 min-h-[88vh] max-h-[88vh] overflow-y-auto grid grid-cols-1 mobile-l:grid-cols-2 min-[470px]:grid-cols-2 tablet-s:grid-cols-3 lg:grid-cols-4 gap-2 tablet-s:gap-4 p-2 tablet-s:p-4 '>
          {/* Default view - shows all category products */}
          { id && categoryProducts[id]?.map((product) => (
            <div key={product._id}>
              <ProductCard product={product}/>
            </div>
          ))}
        </div>          
        )}

      </div>
    </Wrapper>
  )
}

export default ProductList