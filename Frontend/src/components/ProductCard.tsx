'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useProductStore } from '@/store/prodcutStore';
import { useEffect } from 'react';
import Image from 'next/image';
import DisplayCurrencyAndPrice from '@/utils/DisplayCurrencyAndPrice';
import Link from 'next/link';
import { TProduct } from '@/types/productTypes';

const ProductCard = ({product}: {product: TProduct}) => {

  return (
    <div className='flex items-center justify-between w-full'>
      <div key={product?._id} className='border p-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg cursor-pointer shadow-md'>
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
            <button className='bg-primary-base/80 hover:bg-primary-base text-white px-2 lg:px-4 py-1 rounded'>Add</button>
          </div>
        </div>
      </div>

    </div>

  );
};

export default ProductCard;