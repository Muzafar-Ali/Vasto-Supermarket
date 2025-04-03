'use client'
import Wrapper from "@/components/Wrapper"
import { useCategoryStore } from "@/store/categoryStore"
import { useSubCategorytStore } from "@/store/subCategoryStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CategoriesSkeleton } from "@/components/skeletons/CategoriesSkeleton ";

const Categories = () => {
  const { categories, loading } = useCategoryStore();
  // Note: getAllCategories &  getAllSubCategories func are called in the useEffect hook inside desktop menu
  
  return (
    <Wrapper className="mt-5 lg:mt-10">
      <h2 className="text-base md:text-xl font-semibold">Shop by <span className="text-primary-base">category</span></h2>
      { loading && <CategoriesSkeleton/>}
      <div className="my-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
        { !loading && categories?.map((category) => (
          
          <Link 
            href={`/productList/${category.slug}/${category._id}`}
            key={category._id} 
            className="w-full h-full"
          >
            <div>
              <Image 
                src={category.image} 
                alt={category.name} 
                width={1000} 
                height={1000} 
                className="object-cover bg-[#E5F3F3] rounded-2xl"
              /> 
            </div>
            <p className="font-semibold text-xs">{category.name}</p>
          </Link>
        ))}
      </div>
    </Wrapper>
  )
}

export default Categories