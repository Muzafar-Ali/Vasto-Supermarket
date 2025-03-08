import Wrapper from '@/components/Wrapper'
import React from 'react'

const ProductList = () => {
  return (
    <Wrapper className='sticky top-24 lg:top-20'>
      <div className='grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]'>
        {/* side bar- sub category dispaly */}
        <div className='bg-primary-base min-h-[79vh]'>1</div>
        
        {/* product list display */}
        <div className='bg-green-500'>2</div>

      </div>
    </Wrapper>
  )
}

export default ProductList