import { FaThreads, FaXTwitter } from "react-icons/fa6"
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"

const Footer = () => {
  return (
    <section className="border-t">
      <div className="flex flex-col md:flex-row items-center gap-2 justify-between md:px-20 lg:px-32 py-5">
        <p className="text-[10px] text-gray-900 uppercase">&copy; 2025 Vasto supermarket LLC</p>
        
        <div className="flex items-center justify-between gap-5 transition-all duration-300">
          <div className="flex items-center justify-center bg-primary-base p-1 md:p-2 rounded-full hover:scale-125 cursor-pointer">
            <FaFacebookF className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center justify-center bg-primary-base p-1 md:p-2 rounded-full hover:scale-125 cursor-pointer">
            <FaXTwitter className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center justify-center bg-primary-base p-1 md:p-2 rounded-full hover:scale-125 cursor-pointer">
            <FaInstagram className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center justify-center bg-primary-base p-1 md:p-2 rounded-full hover:scale-125 cursor-pointer">
            <FaLinkedinIn className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center justify-center bg-primary-base p-1 md:p-2 rounded-full hover:scale-125 cursor-pointer">
            <FaThreads className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer