import React from 'react'
import Wrapper from './Wrapper'
import { IoMdClose } from "react-icons/io";
import { TProduct } from '@/types/productTypes';

type SearchProps = {
  isSearchOpen: boolean,
  products: TProduct[];
  setIsSearchOpen: (value: boolean) => void
}

const Search = ({ isSearchOpen, setIsSearchOpen, products }: SearchProps) => {
  return (
    <Wrapper className={`absolute top-40 left-20 bg-white border rounded-md ${isSearchOpen ? 'block' : 'hidden'}`}>
      {/* header */}
      <div className='flex items-center justify-between bg-green-100 p-2 rounded-t-md'>
        <p className='font-bold'> Search Result:</p>
        <IoMdClose size={20} className='cursor-pointer bg-primary-base/50 rounded' onClick={() => setIsSearchOpen(false)}/>
      </div>

      {/* products */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products && products.map((product: TProduct) => (
          <div key={product._id} className='flex items-center gap-2'>
            <img src={product.imageUrl[0]} alt={product.name} className='h-12 w-12'/>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

export default Search