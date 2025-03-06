'use client'
import Wrapper from '@/components/Wrapper'
import { useCategoryStore } from '@/store/categoryStore'
import { use } from 'react'

const Product = ({params}: {params: Promise<{ id: string }>}) => {
  const resolvedParams = use(params);
  const id = resolvedParams?.id; 

  const { products, getCategory} = useCategoryStore();
  
  console.log('products', products);
  
  return (
    <Wrapper> 
      <div className='sticky top-24 mx-auto grid'>
        product
      </div>
    </Wrapper>
  )
}

export default Product