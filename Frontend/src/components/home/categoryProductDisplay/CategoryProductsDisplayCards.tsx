'use client'
import { useProductStore } from '@/store/prodcutStore';
import DisplayCurrencyAndPrice from '@/utils/displayCurrencyAndPrice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react'

const CategoryProductDispalyCards = ({id, category}: {id: string, category: string}) => {
  const { getProductByCategory, categoryProducts} = useProductStore();
  
  useEffect(() => {
    getProductByCategory(id);
  }, [id])

  const products = categoryProducts[id] || [];
  
  return (
    <div>

      {/* Display category name first */}
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold text-lg md:text-xl'>{category}</h3> 
        <Link href={""} className='text-green-600 hover:text-green-200'>See all</Link>
      </div>

      {/* Display products for this category */}
      <div className='flex items-center justify-between'>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className='border p-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer'>
              {/* image */}
              <div className='min-h-20 w-full max-h-24 lg:max-h-32 bg-blue-50 rounded overflow-hidden'>
                <Image src={product?.imageUrl[0]} alt={product.name} width={1000} height={1000} className='h-full w-full object-scale-down lg:scale-125 transition-all duration-200'/>
              </div>

              {/* quantity */}
              <div className='rounded text-xs w-fit py-[1px] px-2 text-green-600 bg-green-50'>
                min 10
              </div>
              <div className='font-medium text-sm lg:text-base text-ellipsis line-clamp-2'>{product.name}</div>
              <div className='text-sm lg:text-base w-fit'>{product.unit}</div>

              <div className='flex items-center justify-between text-sm lg:text-base'>
                <div className='font-semibold'>{DisplayCurrencyAndPrice(product.price)}</div>
                <div>
                  <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>Add</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
        
      </div>
      
    </div>
  )
}

export default CategoryProductDispalyCards