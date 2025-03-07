import Image from 'next/image'
import logo4 from '@/assets/logo4.png'
import { BiGridSmall, BiMenuAltLeft, BiSearch } from 'react-icons/bi'

import { BsCart3 } from 'react-icons/bs'
import { IoPersonAddSharp, IoPersonSharp } from 'react-icons/io5'
import Register from '../Register'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex flex-col px-2 md:px-5 lg:px-10 bg-primary-base sticky top-0 left-0 right-0 z-50 w-full shadow-md pt-2 max-xl:pb-2">
      <div className="flex items-center justify-between gap-2">
        {/* logo */}
        <div className="">
          <Image src={logo4} alt='logo' className='h-7 w-14 md:h-10 md:w-20 rounded md:rounded-md focus:outline-none' />
          {/* <h1 className='text-base font-semibold text-[#F7552E]/90 mt-2'>SUPERMARKET</h1> */}
        </div>
  
        {/* search */}
        <div className="bg-white h-7 md:h-10 min-w-[100px] sm:min-w-[400px] lg:min-w-[600px] flex items-center gap-2 px-1 rounded-md text-[#F65831]">
          <BiSearch className="h-6 w-6 md:h-8 md:w-8" />
          <input
            type="text"
            placeholder="Search"
            className="h-10 rounded-md w-full outline-none"
          />
        </div>

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
          <div className="flex items-center justify-between gap-2 text-white font-semibold">
            <div className='relative'>
              <p className='border rounded-full bg-[#EE2527] absolute -top-2 -right-2 h-5 w-5 pt-0.5 w text-center text-xs'>10</p>
              <BsCart3  className='h-6 w-6 md:h-8 md:w-8'/>
            </div>
            <p className='text-base hidden xl:block'>My Cart</p>
          </div>

          {/* mobile Menu icon */}
          <div className='text-white font-semibold flex items-center gap-1 text-sm xl:hidden'>
            <BiMenuAltLeft className='h-8 w-6 sm:h-8 sm:w-8'/>
          </div>
        </div>



      </div>

      {/* menu  */}
      <menu className="hidden xl:flex items-center gap-5 py-3 text-white text-sm font-semibold mt-3 w-full bg-primary-base shadow-md relative">
        <li className='flex items-center'>
          <BiGridSmall size={40}/>
          <Link href="/">All categories</Link>
        </li>

        
        <li>
          <Link href="/about">vegetable & Fruits</Link>
        </li>
        <li>
          <Link href="/contact">Chiken, Meat & Fish</Link>
        </li>
        <li>
          <Link href="/contact">Ice creams & frozen desserts</Link>
        </li>
        <li>
          <Link href="/contact">Dairy and Breakfast</Link>
        </li>
        <li>
          <Link href="/contact">instant & Frozen Food</Link>
        </li>
        <li>
          <Link href="/contact">Bakery & Biscuits</Link>
        </li>
      </menu>

    </div>
  )
}

export default Navbar