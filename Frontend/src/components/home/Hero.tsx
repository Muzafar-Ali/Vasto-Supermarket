import Wrapper from "@/components/Wrapper"
import Image from "next/image"
import pet from "@/assets/pet.png"
import electronics from "@/assets/electronics.webp"
import frozen from "@/assets/frozen.webp"
import snacks from "@/assets/snacks.webp"
import Link from "next/link"

const Hero = () => {
  return (
    <Wrapper className="md:mt-10 py-4 w-full flex items-center gap-2">
      <div className="grid grid-cols-1 tablet-s:grid-cols-2 lg:grid-cols-3 gap-2">
      
        <Link href={"productList/home-and-office/67c5cd5b18113a5f2de66892?subcategory=audio-and-accessories&subcatId=67d1655ab5999b5074bdc0e2"}>
          <Image src={electronics} alt="electronics" className="w-full h-full rounded-2xl hidden md:block"/>          
          <Image src={pet} alt="pet care" className="rounded-2xl w-full min-h-[130px] mobile-l:h-full md:hidden" />          
        </Link>
        
        <Link href="productList/instant-and-frozen-food/#...?subcategory=#...&subcatId=#..." className="relative hidden tablet-s:block">
          <Image src={frozen} alt="frozen items" className="w-full h-full rounded-2xl "/>          
        </Link>

        <Link href="productList/pet-care/#...?subcategory=#...&subcatId=#..." className="relative hidden lg:block">
          <Image src={pet} alt="pet care" className="w-full h-full rounded-2xl" />
        </Link>

      </div>
    </Wrapper>
  )
}

export default Hero