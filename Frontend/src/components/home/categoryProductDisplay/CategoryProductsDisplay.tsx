'use client'
import { useCategoryStore } from '@/store/categoryStore';
import Wrapper from '@/components/Wrapper';
import CategoryWiseProductDisplay from './CategoryWiseProductDisplay';
import { categoriesToDisplay } from '@/constants/categoriesToDisplay';


const CategoryProductsDisplay = () => {
  const { categories } = useCategoryStore();
  
  // Filter categories based on predefined list
  const filteredCategories = categories.filter((cat) => categoriesToDisplay.includes(cat.slug));
  
  return (
    <Wrapper>
      { filteredCategories?.map((item) => (
        <div key={item._id}>
          <CategoryWiseProductDisplay 
            id={item._id} 
            category={item.name} 
            slug={item.slug}
          />
        </div>
      ))}
    </ Wrapper>
  )
}

export default CategoryProductsDisplay