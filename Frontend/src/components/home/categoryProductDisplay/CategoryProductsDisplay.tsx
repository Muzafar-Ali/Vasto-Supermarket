'use client'
import { useCategoryStore } from '@/store/categoryStore';
import Wrapper from '@/components/Wrapper';
import CategoryWiseProductDisplay from './CategoryWiseProductDisplay';


const CategoriesToDisplay = [
  'home-and-office', 
  "flour-rice-and-lentils", 
  'snacks-and-munchies', 
  "pharma-and-wellness"
]

const CategoryProductsDisplay = () => {
  const { categories } = useCategoryStore();
  
  // Filter categories based on predefined list
  const filteredCategories = categories.filter((cat) => CategoriesToDisplay.includes(cat.slug));
  
  return (
    <Wrapper>
      { filteredCategories?.map((item) => (
        <div key={item._id} className=''>
          <CategoryWiseProductDisplay id={item._id} category={item.name} slug={item.slug}/>
        </div>
      ))}
    </ Wrapper>
  )
}

export default CategoryProductsDisplay