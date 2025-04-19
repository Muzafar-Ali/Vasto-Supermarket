import Categories from "@/components/home/Categories";
import CategoryProductsDisplay from "@/components/home/categoryProductDisplay/CategoryProductsDisplay";
import Hero from "@/components/home/Hero";

export default function Home() {  
  return (
    <div className="bg-backgroud-primary pb-10">
      <Hero/>
      <Categories/>
      <CategoryProductsDisplay/>
    </div>
  );
}
