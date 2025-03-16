'use client'
import { useCategoryStore } from '@/store/categoryStore';
import Wrapper from '@/components/Wrapper';
import CategoryProductsSlider from './CategoryProductsSlider';
import CategoryWiseProductDisplay from '../CategoryWiseProductDisplay';
import Link from 'next/link';

const CategoriesToDisplay = [
  "flour-rice-and-lentils", 
  'home-and-office', 
  'snacks-and-munchies', 
  "pharma-and-wellness"
]

const CategoryProductsDisplay = () => {
  const { categories } = useCategoryStore();
  
  // Filter categories based on predefined list
  const filteredCAtegories = categories.filter((cat) => CategoriesToDisplay.includes(cat.slug));

  return (
    <Wrapper>
      { filteredCAtegories?.map((item) => (
        <div key={item._id} className=''>
          <CategoryWiseProductDisplay id={item._id} category={item.name}/>
        </div>
      ))}
    </ Wrapper>
  )
}

export default CategoryProductsDisplay