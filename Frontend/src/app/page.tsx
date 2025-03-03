import Categories from "@/components/home/Categories";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-backgroud-primary">
      <Navbar/>
      <Hero/>
      <Categories/>
    </div>
  );
}
