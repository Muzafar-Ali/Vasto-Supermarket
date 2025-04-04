'use client'
import Image from 'next/image'
import logo4 from '@/assets/logo4.png'
import { BsCart3 } from 'react-icons/bs'
import { IoPersonAddSharp, IoPersonSharp } from 'react-icons/io5'
import { RxHamburgerMenu } from "react-icons/rx";
import Register from '@/components/Register'
import Link from 'next/link'
import SearchInput from '../search/SearchInput'
import { useCartStore } from '@/store/cartStore'
import { AlertDialog, AlertDialogTrigger } from '../ui/alert-dialog'
import { AlertDialogContent } from '@radix-ui/react-alert-dialog'
import { useState } from 'react'
import Cart from '../Cart'
import MobileMenu from './MobileMenu'
import DesktopMenu from './DesktopMenu'

const Navbar = () => {

  const {totalItems} = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState); // Toggle the mobile menu state
  };

  // Close mobile menu
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <div className="flex flex-col px-2 md:px-5 lg:px-10 bg-primary-base sticky top-0 left-0 right-0 z-50 w-full shadow-md pt-2 max-xl:pb-2">
      <div className="flex items-center justify-between gap-2 relative">
        {/* logo */}
        <Link href="/" className="">
          <Image src={logo4} alt='logo' className='h-7 w-14 md:h-10 md:w-20 rounded md:rounded-md focus:outline-none' />
          {/* <h1 className='text-base font-semibold text-[#F7552E]/90 mt-2'>SUPERMARKET</h1> */}
        </Link>
  
        {/* search */}
        <SearchInput/>

        {/* location
        <div className='text-white font-semibold'>
          <p>Location</p>
        </div> */}
        
        {/* login and my cart */}
        <div className='flex items-center gap-3 sm:gap-5'>
          <div className='hidden lg:flex items-center gap-2'>
            <div className='text-white font-semibold flex items-center gap-1 text-sm p-1'>
              <IoPersonSharp size={20} className='border rounded-lg'/>
              <a href="/login">Login</a>
            </div>
            <div className='text-white font-semibold flex items-center gap-1 text-sm '>
              <IoPersonAddSharp size={20} className='border rounded-lg'/>
              {/* <a href="/login">Register</a> */}
              <Register/>
            </div>
          </div>

          {/* cart */}
          <AlertDialog open={isCartOpen} onOpenChange={setIsCartOpen}>
            <AlertDialogTrigger asChild>
              <div className="flex items-center justify-between gap-2 text-white font-semibold">
                <div className='relative'>
                  <p className='border rounded-full bg-[#EE2527] absolute -top-2 -right-2 h-5 w-5 pt-0.5 w text-center text-xs'>{ totalItems }</p>
                  <BsCart3  className='h-6 w-6 md:h-8 md:w-8'/>
                </div>
                <p className='text-base hidden xl:block'>My Cart</p>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent asChild>
              <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
            </AlertDialogContent>
          </AlertDialog>

          {/* mobile Menu icon */}
          <div className="text-white font-semibold flex items-center gap-1 text-sm xl:hidden" onClick={toggleMobileMenu}>
            <RxHamburgerMenu className='h-8 w-6 sm:h-8 sm:w-8'/>
          </div>
        </div>

      </div>

      {/* menu  */}
      <menu className="hidden xl:flex items-center gap-5 py-3 text-white text-sm font-semibold mt-3 w-full bg-primary-base shadow-md relative">
        <DesktopMenu />
      </menu>

      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleCloseMobileMenu} />

    </div>
  )
}

export default Navbar