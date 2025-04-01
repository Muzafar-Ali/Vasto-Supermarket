// components/skeletons/CategoriesSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export const CategoriesSkeleton = () => {
  return (
    <div className="my-4 grid grid-cols-4 mobile-m:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div>
            <Skeleton className="h-18 w-16 tablet-s:h-28 tablet-s:w-24 md:h-32 md:w-28   rounded-2xl" >
            <div className="top-0 left-0 w-full h-full flex justify-center items-center">
              <Image 
                src="/spinner2.svg" 
                width={1000} 
                height={1000}  
                alt='' 
                className='inline-block bg-transparent text-black h-[30px] w-[30px] md:h-[45px] md:w-[45px]' 
              />
            </div>
            </Skeleton>
          </div>
          <Skeleton className="h-4 w-16 m-1 rounded-2xl" />
        </div>
      ))}
    </div>
  );
};    