'use client'
import { useProductStore } from '@/store/prodcutStore';
import { useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const CategoryProductsSlider = ({id, category}: {id: string, category: string}) => {
  const { getProductByCategory, categoryProducts} = useProductStore();
  
  useEffect(() => {
    getProductByCategory(id);
  }, [id])

  const products = categoryProducts[id] || [];

  return (
    <div>

      {/* Display category name first */}
      <div className='flex items-center justify-between py-5'>
        <h3 className='font-semibold text-lg md:text-xl'>{category}</h3> 
        <Link href={""} className='text-green-600 hover:text-green-200'>See all</Link>
      </div>

        {/* Display products for this category */}
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
              centeredSlides: true,
              centeredSlidesBounds: true
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 30
            }
          }}
          // className="my-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide 
              key={index} 
              className='max-w-36 lg:min-w-52 lg:max-w-52 py-2'
            >
              <ProductCard product={product}/>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  );
};

export default CategoryProductsSlider;