'use client'
import { useCategoryStore } from '@/store/categoryStore';
import CategoryProductDispalyCards from './CategoryProductDispalyCards';
import Wrapper from '@/components/Wrapper';

const Category = ["flour-rice-&-lentils", 'home-&-office', 'snacks-&-munchies', "pharma-&-wellness"]

const CategoryProductDispaly = () => {
  const { categories } = useCategoryStore();

    // Filter categories based on predefined list
    const filteredCAtegories = categories.filter((cat) => Category.includes(cat.slug));

  return (
    <Wrapper>
      { filteredCAtegories?.map((item) => (
        <div key={item._id}>
          <CategoryProductDispalyCards id={item._id} category={item.name}/>
        </div>
      ))}
    </ Wrapper>
  )
}

export default CategoryProductDispaly