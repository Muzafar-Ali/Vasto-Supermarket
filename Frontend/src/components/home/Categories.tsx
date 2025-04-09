'use client'
import Wrapper from "@/components/Wrapper"
import { useCategoryStore } from "@/store/categoryStore"
import Image from "next/image";
import Link from "next/link";
import { CategoriesSkeleton } from "@/components/skeletons/CategoriesSkeleton ";

const Categories = () => {
  const { categories, loading } = useCategoryStore();
  // Note: getAllCategories &  getAllSubCategories func are called in the useEffect hook inside navbar/ DesktopMenu
  
  return (
    <Wrapper className="mt-5 lg:mt-10">
      <h2 className="text-base md:text-xl font-semibold">
        Shop by <span className="text-primary-base">Categories</span>
      </h2>
      
      { loading && <CategoriesSkeleton/>}
      
      <nav 
        aria-label="Product categories navigation"
        className="my-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4"
      >
        { !loading && categories?.map((category, index) => (
          
          <Link 
            href={`/productList/${category.slug}/${category._id}`}
            key={category._id} 
            className="w-full h-full"
            prefetch={index < 8} // Prefetch first 8 links
          >
            <div>
              <Image 
                src={category.image} 
                alt={`Illustration of ${category.name}`} 
                width={1000} 
                height={1000} 
                className="object-cover bg-primary-base-2 rounded-2xl"
                priority={index < 8} // Priority for first 8 (above-the-fold)
                loading={index > 7 ? "lazy" : "eager"}
                quality={75}
              /> 
            </div>
            <p className="font-semibold text-xs">{category.name}</p>
          </Link>
        ))}
      </nav>
    </Wrapper>
  )
}

export default Categories