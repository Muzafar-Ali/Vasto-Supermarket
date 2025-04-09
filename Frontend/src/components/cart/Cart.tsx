'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
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
import { AlertDialogTitle } from '../ui/alert-dialog'
import CheckoutConfirm from './CheckoutConfirm'

type TCartProps = {
  isCartOpen: boolean,
  setIsCartOpen: (value: boolean) => void
}

const Cart = ({ isCartOpen, setIsCartOpen }: TCartProps) => {
  const {cart, totalItems, decreaseQuantity, increaseQuantity} = useCartStore()
  
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cart.reduce((acc, item) => acc + (item.price * item.discount / 100 ) * item.quantity, 0);
  const handlingCharge = config.handlingCharge;
  const deliveryCharge = config.deliveryCharge;
  const totalAmount = (totalPrice - totalSavings) + handlingCharge;

  // Create a reference for the cart container to handle click outside events
  const cartRef = useRef<HTMLDivElement>(null);
  const [isCheckoutConfirmOpen, setIsCheckoutConfirmOpen] = useState(false)

  /**
   * Effect to handle click outside the cart to close it
   * Adds event listener when cart is open and removes it on cleanup
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click occurred outside the cart container
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false); // Close the cart
      }
    }

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);
  

  return (
    <aside aria-label="Shopping Cart" role="dialog" aria-modal="true">
      {/* Add the hidden title for accessibility - won't affect your layout */}
      <AlertDialogTitle className="sr-only">Shopping Cart</AlertDialogTitle>
      <div className='bg-neutral-900/50 bg-opacity-70 fixed top-0 bottom-0 left-0 right-0 z-50'>
        
        {/* Cart container */}
        <section 
          ref={cartRef} 
          className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto relative'
          aria-labelledby="cart-heading"
        >
          {/* CheckoutConfirm positioned absolutely within cart width */}
          <div className={`absolute top-0 right-0 w-full max-w-sm h-full ${isCheckoutConfirmOpen ? "z-10" : "-z-10"}`}>
            <CheckoutConfirm open={isCheckoutConfirmOpen} setOpen={setIsCheckoutConfirmOpen}/>
          </div>

          {/* Cart header and close icon */}
          <header className='flex items-center p-4 shadow-md gap-3 justify-between'>
            <h2 className='font-semibold'>Cart</h2>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)} 
              aria-label="Close cart"
            >
              <IoClose size={25}/>
            </button>
          </header>

          {/* Cart contents */}
          <section className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
            { cart[0] ? (
              <>
                <div className='flex items-center justify-between px-4 py-2 bg-blue-100 font-semibold text-sm text-primary-base rounded-full'>
                  <p>Your Total Savings</p> 
                  <p>{displayCurrencyAndPrice(Number(totalSavings.toFixed(2)))}</p>
                </div>
              
                {/* Cart items */}
                <div className='bg-white rounded-lg grid gap-5 p-4 overflow-auto'>
                  { cart.map((item, index) => (
                      <div key={index} className='flex w-full gap-4'>
                        <figure className='min-h-16 min-w-16 border rounded'>
                          <Image 
                            src={item.imageUrl[0]} 
                            width={64} 
                            height={64} 
                            alt={`Product image for ${item.name}`} 
                            className="object-scale-down"
                          />
                        </figure>
                        <div className='w-full max-w-sm text-xs'>
                          <h3 className="text-xs text-ellipsis line-clamp-2">{item.name}</h3>
                          <p className='text-neutral-400'>{item.unit}</p>
                          <div className='flex items-center gap-1'>
                            <p className='font-semibold text-[10px]'>{displayCurrencyAndPrice(item.price)}</p>
                            <p className='text-neutral-600 line-through text-[10px]'>
                              {displayCurrencyAndPrice(totalPrice - totalSavings)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className='flex items-center gap-1 '>
                          <button 
                            className="text-white bg-primary-base p-1 rounded"
                            onClick={() => decreaseQuantity(item)}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <FaMinus size={12}/>
                          </button>
                          <p className='text-sm border border-green-700 px-2 rounded'>{item.quantity}</p>
                          <button 
                            className='text-white bg-primary-base p-1 rounded'
                            onClick={() => increaseQuantity(item)}
                          ><FaPlus size={12}/></button>
                        </div>
                      </div>
                    ))
                  }
                </div>

                {/* Order summary */}
                <section className='bg-white p-4 flex flex-col gap-[0.5px]'>
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
                      <p className='flex items-center gap-2 text-primary-base'>Free</p>
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
                </section>
              </>
            ):(
              /* Empty cart state */
              <article className="bg-white flex flex-col justify-center items-center pb-5">
                <Image 
                  src={imageEmpty} 
                  alt="Empty shopping cart" 
                  width={500} 
                  height={500} 
                  className="w-full h-full object-scale-down"
                />
                <p className='text-center text-neutral-400'>Your cart is empty</p>
                <Link 
                  onClick={close} 
                  href={"/"} 
                  className='block bg-green-600 px-4 py-2 text-white rounded mt-5'
                >
                  Shop Now
                </Link>
              </article>
            )} 
          </section>
          
          {/* Checkout section */}
          { cart[0] && (
            <footer className='p-2'>
              <div className='bg-primary-base text-neutral-100 px-4 py-3 font-bold text-base static bottom-3 rounded flex items-center gap-4 justify-between'>
                {/* total price */}
                <div className='flex flex-col text-xs'>
                  <span className='text-xs'>Total</span>
                  <span>{displayCurrencyAndPrice(totalAmount)}</span>
                </div>
                
                <button 
                  className='flex items-center gap-1 text-base'
                  aria-label="Proceed to checkout"
                  onClick={() => setIsCheckoutConfirmOpen(true)}
                >
                  <span>Login to Proceed</span>
                  <FaCaretRight/>
                </button>
              </div>
            </footer>
          )}
        </section>
      </div>
    </aside>
  )
}

export default Cart