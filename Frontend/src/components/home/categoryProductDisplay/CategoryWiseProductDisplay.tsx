import Link from 'next/link';
import { useEffect, useRef } from 'react'
import { useProductStore } from '@/store/prodcutStore';
import { FaAngleLeft } from "react-icons/fa6";
import ProductCard from '@/components/ProductCard';

type TCategoryWiseProductDisplayProps = {
  id: string,
  category: string
  slug: string
}

const CategoryWiseProductDisplay = ({id, category, slug}: TCategoryWiseProductDisplayProps) => {

  const { getProductByCategory, categoryProducts } = useProductStore();

  // Create a reference for the container element to control scrolling
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getProductByCategory(id);
  }, [id]);

  // Retrieve the products for the given category ID, defaulting to an empty array if not found
  const products = categoryProducts[id] || [];

  // Function to scroll the container to the right by 200 pixels
  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  // Function to scroll the container to the left by 200 pixels
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };
    
  return (
    <div className='max-w-[1280px] my-14'>
      <div className='p-4 flex items-center justify-between gap-4'>
        <div className='font-semibold text-base md:text-xl'>{category}</div>
        <Link href={`/productList/${slug}/${id}`} className='text-green-600 hover:text-green-400'>See all</Link>
      </div>

      <div className='flex items-center gap-4 md:gap-3 lg:gap-4 px-4 overflow-x-scroll scrollbar-none scroll-smooth py-2' ref={containerRef}>
        {
          products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product}/>
            </div>
          ))
        }

        <div className='absolute right-0 left-0 px-2 hidden lg:flex justify-between w-full max-w-[1280px] mx-auto'>
          {/* Left arrow button */}          
          <button 
            onClick={handleScrollLeft} 
            className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-3 rounded-full'
            aria-label={`Scroll ${category} products left`}
          >
             <FaAngleLeft aria-hidden="true"/>
          </button>

          {/* right */}
          <button 
            onClick={handleScrollRight} 
            className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-3 rounded-full'
            aria-label={`Scroll ${category} products right`}
          >
            <FaAngleLeft className='rotate-180' aria-hidden="true"/>
          </button>

        </div>
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay