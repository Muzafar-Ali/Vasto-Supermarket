import React, { useState } from 'react';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Image from 'next/image';
import logo4 from '@/assets/logo4.png'
import { useCategoryStore } from '@/store/categoryStore';
import { BiGridSmall } from 'react-icons/bi';
import { menuData } from '@/constants/menu';


const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false)
  const {categories} = useCategoryStore()

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-[320px] mobile-m:w-[375px] mobile-l:w-[426px] max-w-[426px] bg-primary-base text-white py-4 px-5 transform transition-transform duration-300 ease-in-out ${ isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      
      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button onClick={onClose} className="text-white text-2xl">
          <IoClose />
        </button>
      </div>

      {/* mobile menu */}
      <div className='flex flex-col w-full'>

        {/* logo */}
        <div className='bg-primary-base/50 h-20 border-b'>
          <Link href="/" className="">
            <Image src={logo4} alt='logo' className='h-10 w-20 rounded md:rounded-md focus:outline-none' />
          </Link>
        </div>
        
        {/* menu categories */}
        <Link 
          href="/" className="py-5 text-sm font-medium border-b border-gray-200/50" 
          onClick={() => setIsAllCategoriesOpen(true)}
        >
          {/* all categories */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <BiGridSmall size={25}/>
              <p>All categories</p>
            </div>
            <HiOutlineChevronRight size={20}/>
          </div>
        </Link>
        
        {/* other categories */}
        { menuData.map((item) => (
          <Link 
            key={item.id}
            href={item.href} 
            className="py-5 text-sm font-medium border-b border-gray-200/50"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}

      </div>
      
      {/* All Categories Menu Slide-in */}
      <div
        className={`absolute top-0 right-0 h-screen bg-primary-base text-white py-4 px-5 transform transition-all duration-500 ease-in-out flex flex-col w-full ${isAllCategoriesOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* Close Button and Title */}
        <div className="bg-primary-base/50 h-20 border-b flex items-center gap-5 px-4">
          <HiOutlineChevronLeft size={30} className="text-white cursor-pointer" onClick={() => setIsAllCategoriesOpen(false)} />
          <span className="text-white text-base">All Categories</span>
        </div>

        {/* List of Categories */}
        <div className="flex-1 overflow-y-auto px-5">
          {categories.map((items) => (
            <Link 
              href={`/productList/${items.slug}/${items._id}`} 
              key={items._id} 
              className="py-4 text-sm font-medium border-b border-gray-200/50 block"
              onClick={onClose}
            >
              {items.name}
              
            </Link>
          ))}
        </div>
        
      </div>

    </div>
  );
};

export default MobileMenu;
