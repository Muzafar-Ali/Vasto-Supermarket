"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCategoryStore } from "@/store/categoryStore"
import { useSubCategorytStore } from "@/store/subCategoryStore"
import { BiGridSmall } from "react-icons/bi"
import { useEffect } from "react"

const DesktopMenu = () => {
  const { categories, getAllCategories } = useCategoryStore();
  const { allSubCategories, getAllSubCategories } = useSubCategorytStore();
  
  useEffect(() => {
    const getCategories = async () => {
      await Promise.all([
        getAllCategories(),
        getAllSubCategories()
      ]);
    }
    getCategories();
  }, [getAllCategories, getAllSubCategories]);

  // Manually specify which categories to show in main nav
  const featuredCategories = [
    "Instant & Frozen Food",
    "Pharma & Wellness", 
    "Bakery & Biscuits"
  ];

  // Filter categories to only show the featured ones
  const mainCategories = categories.filter(category => 
    featuredCategories.includes(category.name)
  );
  
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className='flex items-center'>
                <BiGridSmall size={40}/>
                <p>All categories</p>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="rounded-none top-2">
              <div className="max-h-[70vh] overflow-y-auto">
                <ul className="grid grid-cols-3 xl:min-w-[1182px] min-[1400px]:w-[1310px] min-[1500px]:w-[1410px]  mx-auto p-4">
                  {categories.map((category) => {
                    const categorySubCategories = allSubCategories.filter(
                      (subCategory) => subCategory.category.includes(category._id)
                    );
                    
                    return (
                      <li key={category._id} className="mb-4">
                        <NavigationMenuLink asChild>
                          <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-transparent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none mb-2 text-primary-base">
                              {category.name}
                            </div>
                            <ul className="space-y-1">
                              {categorySubCategories.map((subCategory) => (
                                <li key={subCategory._id}>
                                  <Link
                                    href={{
                                      pathname: `/productList/${category.slug}/${category._id}`,
                                      query: {
                                        subcategory: subCategory.slug,
                                        subcatId: subCategory._id
                                      }
                                    }}
                                    className="text-xs text-muted-foreground hover:text-primary-base"
                                  >
                                    {subCategory.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </NavigationMenuLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          {/* Featured category dropdowns */}
          {mainCategories.map((category) => {
            const categorySubCategories = allSubCategories.filter(
              sub => sub.category.includes(category._id)
            );

            return (
              <NavigationMenuItem key={category._id}>
                <NavigationMenuTrigger>
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-none">
                <ul className="grid xl:min-w-[1182px] min-[1400px]:w-[1310px] min-[1500px]:w-[1410px]  mx-auto p-4">
                    {categorySubCategories.map((sub) => (
                      <li key={sub._id}>
                        <Link
                          href={{
                            pathname: `/productList/${category.slug}/${category._id}`,
                            query: { subcategory: sub.slug, subcatId: sub._id }
                          }}
                          // className="block p-2 hover:bg-gray-100"
                          className="block p-2 text-muted-foreground hover:text-primary-base text-sm font-medium leading-none"

                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
        
    </>
  )
}

export default DesktopMenu