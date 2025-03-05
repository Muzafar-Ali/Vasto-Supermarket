'use client'
import Wrapper from "@/components/Wrapper"
import { useCategoryStore } from "@/store/categoryStore"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const Categories = () => {
  const { categories, getAllCategories } = useCategoryStore();
  console.log('categories', categories);
  
  useEffect(() => {
    getAllCategories();
  }, [])
  
  return (
    <Wrapper className="my-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4">
      { categories?.map((category) => (
        <Link href={`/products/${category.slug}/${category._id}`} key={category._id} className="w-full h-full">
          <div>
            <Image src={category.image} alt={category.name} width={1000} height={1000} className="object-cover bg-primary-base/10 rounded-2xl"/> 
          </div>
          <p className="font-semibold text-xs">{category.name}</p>

        </Link>
        // <div className="bg-white rounded p-4 min-h-36 grid gap-2 shadow">
        //   <div className="bg-blue-100 min-h-24"></div>
        //   <div className="bg-blue-100 h-8"></div>
        // </div>
      ))}
    </Wrapper>
  )
}

export default Categories