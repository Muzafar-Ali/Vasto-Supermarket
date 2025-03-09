'use client'
import Wrapper from "@/components/Wrapper"
import { useCategoryStore } from "@/store/categoryStore"
import { useSubCategorytStore } from "@/store/subCategoryStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Categories = () => {
  const { categories, getAllCategories } = useCategoryStore();
  const { allSubCategories, getAllSubCategories} = useSubCategorytStore();

  const catIds = categories?.map((cat) => cat._id);
  const firstMatchingSubCategory = allSubCategories.find(subCat =>
    catIds.includes(subCat.category[0]) // Check if subcategory belongs to a main category
  );
    
  useEffect(() => {
    const getData = async () => {
      await getAllCategories();
      await getAllSubCategories();
    }
    getData()
    
  }, [])

  return (
    <Wrapper className="my-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
      { categories?.map((category) => (
        
        <Link 
        href={{
          pathname: `/productList/${category.slug}/${category._id}`,
          query: {
            subcategory: firstMatchingSubCategory?.slug,  // Dynamic Subcategory Slug
            subcatId: firstMatchingSubCategory?._id       // Dynamic Subcategory ID
          }
        }}
          // href={`/products/${category.slug}/${category._id}/?${firstMatchingSubCategory?.slug}/${firstMatchingSubCategory?._id}`} 
          key={category._id} 
          className="w-full h-full"
        >
          <div>
            <Image 
              src={category.image} 
              alt={category.name} 
              width={1000} 
              height={1000} 
              className="object-cover bg-primary-base/10 rounded-2xl"
            /> 
          </div>
          <p className="font-semibold text-xs">{category.name}</p>
        </Link>
      ))}
    </Wrapper>
  )
}

export default Categories