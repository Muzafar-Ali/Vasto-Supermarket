import Wrapper from "@/components/Wrapper"
import Image from "next/image"
import hero from "@/assets/hero1.png"
import heroSmall from "@/assets/hero1-small.png"

const Hero = () => {
  return (
    <Wrapper className="mt-10 py-4 w-full">
      <div className="w-full h-[170px] mobile-l:h-full lg:min-h-48">
        <Image src={hero} alt="hero" className="w-full h-full rounded-3xl hidden md:block" />
        <Image src={heroSmall} alt="hero" className="w-full h-full rounded-3xl md:hidden" />
      </div>
    </Wrapper>
  )
}

export default Hero