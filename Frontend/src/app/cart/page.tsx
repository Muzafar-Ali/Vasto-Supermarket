'use client'
import Link from 'next/link'
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import imageEmpty from '@/assets/empty_cart.webp'
import { IoClose } from 'react-icons/io5'
import { FaCaretRight } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import displayCurrencyAndPrice from '@/utils/displayCurrencyAndPrice';
import { config } from '@/config/config'

const Cart = () => {
  const {cart, totalItems, decreaseQuantity, increaseQuantity} = useCartStore()
  
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cart.reduce((acc, item) => acc + (item.price * item.discount / 100 ) * item.quantity, 0);
  const handlingCharge = config.handlingCharge;
  const deliveryCharge = config.deliveryCharge;
  const totalAmount = (totalPrice - totalSavings) + handlingCharge;

  const close = () => {
    // document.getElementById('cart')?.classList.add('hidden')
  }
  
  return (
    <div className='bg-neutral-900/50 bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-50'>
      <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
        
        {/* heading and close icon */}
        <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
          <h2 className='font-semibold'>Cart</h2>
          <Link href={"/"} className='lg:hidden'>
            <IoClose size={25}/>
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25}/>
          </button>
        </div>

        <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
          { cart[0] ? (
            <>
              <div className='flex items-center justify-between px-4 py-2 bg-blue-100 font-semibold text-sm text-green-700 rounded-full'>
                <p>Your Total Savings</p> 
                <p>{displayCurrencyAndPrice(Number(totalSavings.toFixed(2)))}</p>
              </div>
            
              {/* display items */}
              <div className='bg-white rounded-lg grid gap-5 p-4 overflow-auto'>
                { cart.map((item, index) => (
                    <div key={index} className='flex w-full gap-4'>
                      <div className='min-h-16 min-w-16 border rounded'>
                        <Image src={item.imageUrl[0]} width={64} height={64} alt={item.name} className='object-scale-down'/>
                      </div>
                      <div className='w-full max-w-sm text-xs'>
                        <p className='text-xs text-ellipsis line-clamp-2'>{item.name}</p>
                        <p className='text-neutral-400'>{item.unit}</p>
                        <div className='flex items-center gap-1'>
                          <p className='font-semibold text-[10px]'>{displayCurrencyAndPrice(item.price)}</p>
                          <p className='text-neutral-600 line-through text-[10px]'>
                            {displayCurrencyAndPrice(totalPrice - totalSavings)}
                          </p>
                        </div>
                      </div>
                      {/* increase decrease button */}
                      <div className='flex items-center gap-1 '>
                        <button 
                          className='text-white bg-green-700 p-1 rounded'
                          onClick={() => decreaseQuantity(item)}
                        >
                          <FaMinus size={12}/>
                        </button>
                        <p className='text-sm border border-green-700 px-2 rounded'>{item.quantity}</p>
                        <button 
                          className='text-white bg-green-700 p-1 rounded'
                          onClick={() => increaseQuantity(item)}
                        ><FaPlus size={12}/></button>
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* summary */}
              <div className='bg-white p-4 flex flex-col gap-[0.5px]'>
                <h3 className='font-semibold text-base'>Bill details</h3>
                <div className='flex gap-4 justify-between ml-1 text-sm'>
                  <div className='flex items-center gap-1'>
                    <BiSolidSpreadsheet size={16}/>
                    <p>Items total</p>
                  </div>
                  <p className='flex items-center gap-2'>
                    <span className='line-through text-neutral-500'>{displayCurrencyAndPrice(totalPrice)}</span>
                    <span>{displayCurrencyAndPrice(totalPrice - totalSavings)}</span>
                  </p>
                </div>
                <div className='flex gap-4 justify-between ml-1 text-sm'>
                  <div className='flex items-center gap-1'>
                    <MdProductionQuantityLimits size={16}/>
                    <p>Total Items</p>
                  </div>
                  <p className='flex items-center gap-2'>
                  {totalItems} {totalItems > 1 ? "items" : "item"}
                  </p>
                </div>
                <div className='flex gap-4 justify-between ml-1 text-sm'>
                  <div className='flex items-center gap-1'>
                    <MdDeliveryDining size={16}/>
                    <p>Delivery Charge</p>
                  </div>  
                  <div className='flex items-center gap-2'>
                    <p className='line-through text-neutral-500'>{displayCurrencyAndPrice(deliveryCharge)}</p>
                    <p className='flex items-center gap-2 text-green-600'>Free</p>
                  </div>
                </div>
                <div className='flex gap-4 justify-between ml-1 text-sm'>
                  <div className='flex items-center gap-1'>
                    <LiaShoppingBagSolid size={16}/>
                    <p>handling Charge</p>
                  </div>  
                  <div className='flex items-center gap-2'>
                    <span>{displayCurrencyAndPrice(handlingCharge)}</span>
                  </div>
                </div>
                <div className='font-semibold flex items-center justify-between gap-4 text-sm'>
                    <p >Grand total</p>
                    <p>{displayCurrencyAndPrice(totalAmount)}</p>
                </div>
              </div>
            </>
          ):(
            // shopping cart empty
            <div className='bg-white flex flex-col justify-center items-center pb-5'>
              <Image src={imageEmpty} alt='empty cart' width={500} height={500} className='w-full h-full object-scale-down'/>
              <p className='text-center text-neutral-400'>Your cart is empty</p>
              <Link onClick={close} href={"/"} className='block bg-green-600 px-4 py-2 text-white rounded mt-5'>Shop Now</Link>
            </div>
          )} 
        </div>
        
        {/* total price & Proceed */}
        { cart[0] && (
          <div className='p-2'>
            <div className='bg-green-700 text-neutral-100 px-4 py-3 font-bold text-base static bottom-3 rounded flex items-center gap-4 justify-between'>
              <div>
                {/* total price */}
                <div className='flex flex-col text-xs'>
                  <p className='text-xs'>Total</p>
                  <p>{displayCurrencyAndPrice(totalAmount)}</p>

                </div>
              </div>
              <button className='flex items-center gap-1 text-base'>
                Login to Proceed
                <FaCaretRight/>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart