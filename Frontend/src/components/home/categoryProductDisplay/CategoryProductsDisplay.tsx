'use client'
import { useCategoryStore } from '@/store/categoryStore';
import Wrapper from '@/components/Wrapper';
import CategoryProductsSlider from './CategoryProductsSlider';

const CategoriesToDisplay = [
  "flour-rice-&-lentils", 
  'home-&-office', 
  'snacks-&-munchies', 
  "pharma-&-wellness"
]

const CategoryProductsDisplay = () => {
  const { categories } = useCategoryStore();

    // Filter categories based on predefined list
    const filteredCAtegories = categories.filter((cat) => CategoriesToDisplay.includes(cat.slug));

  return (
    <Wrapper>
      { filteredCAtegories?.map((item) => (
        <div key={item._id} className=''>
          <CategoryProductsSlider id={item._id} category={item.name}/>
        </div>
      ))}
    </ Wrapper>
  )
}

export default CategoryProductsDisplay