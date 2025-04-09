import Wrapper from "@/components/Wrapper";
import Image from "next/image";
import pet from "@/assets/pet.png";
import electronics from "@/assets/electronics.webp";
import frozen from "@/assets/frozen.webp";
import Link from "next/link";

const Hero = () => {
  return (
    <Wrapper className="md:mt-10 py-4 w-full flex items-center gap-2">
      {/* Preload critical assets */}
      <link 
        rel="preload" 
        href={electronics.src} 
        as="image" 
        fetchPriority="high" 
      />
      <link 
        rel="preload" 
        href={pet.src} 
        as="image" 
        fetchPriority="high"
        media="(max-width: 768px)"
      />

      <section className="grid grid-cols-1 tablet-s:grid-cols-2 lg:grid-cols-3 gap-2" aria-label="Featured product categories">
        {/* Primary Electronics Category */}
        <article className="relative">
          <Link 
            href="/productList/home-and-office/67c5cd5b18113a5f2de66892?subcategory=audio-and-accessories&subcatId=67d1655ab5999b5074bdc0e2"
            aria-label="Browse electronics and audio accessories"
          >
            <Image
              src={electronics}
              alt="High-quality electronics and audio accessories"
              width={1200}
              height={630}
              className="w-full h-full rounded-2xl hidden md:block"
              priority
              quality={85}
            />
            {/* Mobile optimized image */}
            <Image
              src={pet}
              alt="Pet care products for your furry friends"
              width={800}
              height={450}
              className="rounded-2xl w-full min-h-[130px] mobile-l:h-full md:hidden"
              priority
              quality={85}
            />
          </Link>
        </article>

        {/* Frozen Food Category */}
        <article className="relative hidden tablet-s:block">
          <Link 
            href="/productList/instant-and-frozen-food/67c62177c72f06c67f489655?subcategory=ready-to-cook-and-eat&subcatId=67dcf99ed383bfa5f89feca7"
            aria-label="Explore ready-to-cook frozen meals"
          >
            <Image
              src={frozen}
              alt="Convenient frozen meals and ready-to-cook options"
              width={1200}
              height={630}
              className="w-full h-full rounded-2xl"
              quality={85}
            />
          </Link>
        </article>

        {/* Pet Care Category */}
        <article className="relative hidden lg:block">
          <Link 
            href="/productList/pet-care/67c6200dc72f06c67f489652?subcategory=dog-needs&subcatId=67dcf84bd383bfa5f89fec64"
            aria-label="Discover pet care essentials for dogs"
          >
            <Image
              src={pet}
              alt="Premium pet care products for dogs"
              width={1200}
              height={630}
              className="w-full h-full rounded-2xl"
              quality={85}
            />
          </Link>
        </article>
      </section>
    </Wrapper>
  );
};

export default Hero;