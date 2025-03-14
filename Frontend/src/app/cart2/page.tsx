'use client'
import Wrapper from '@/components/Wrapper'
import { config } from '@/config/config'
import { useCartStore } from '@/store/cartStore'
import displayCurrencyAndPrice from '@/utils/displayCurrencyAndPrice'
import Image from 'next/image'
import React from 'react'
import { BiSolidSpreadsheet } from 'react-icons/bi'
import { FaCaretRight, FaMinus, FaPlus } from 'react-icons/fa'
import { LiaShoppingBagSolid } from 'react-icons/lia'
import { MdDeliveryDining, MdProductionQuantityLimits } from 'react-icons/md'

const Cart = () => {
    const {cart, totalItems, decreaseQuantity, increaseQuantity} = useCartStore()
    
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalSavings = cart.reduce((acc, item) => acc + (item.price * item.discount / 100 ) * item.quantity, 0);
    const handlingCharge = config.handlingCharge;
    const deliveryCharge = config.deliveryCharge;
    const totalAmount = (totalPrice - totalSavings) + handlingCharge;

    return (
      <Wrapper>
        {/* Heading */}
        <div className='flex items-center p-4 shadow-md gap-3 justify-between my-5'>
          <h2 className='font-semibold'>Shopping Cart</h2>
        </div>

        {/* Main Container */}
        <div className='flex items-start gap-10 pb-20'>
          {/* Left Side - Cart Items */}
          <div className='flex-[2_1_auto] flex flex-col gap-2 max-h-[80vh] overflow-auto'>
            <div className='flex items-center justify-between px-4 py-2 bg-blue-100 font-semibold text-sm text-green-700 rounded-md'>
              <p>Your Total Savings</p> 
              <p>{displayCurrencyAndPrice(Number(totalSavings.toFixed(2)))}</p>
            </div>

            {/* Display Items */}
            <div className='border bg-white rounded-md grid gap-5 p-4 overflow-auto w-full'>
              {cart.map((item, index) => (
                <div key={index} className='flex w-full gap-4 border rounded-md p-2'>
                  <div className='min-h-16 min-w-16'>
                    <Image src={item.imageUrl[0]} width={64} height={64} alt={item.name} className='object-scale-down'/>
                  </div>
                  <div className='w-full text-xs'>
                    <p className='text-xs text-ellipsis line-clamp-2'>{item.name}</p>
                    <p className='text-neutral-400'>{item.unit}</p>
                    <div className='flex items-center gap-1'>
                      <p className='font-semibold text-[10px]'>{displayCurrencyAndPrice(item.price)}</p>
                      <p className='text-neutral-600 line-through text-[10px]'>
                        {displayCurrencyAndPrice(totalPrice - totalSavings)}
                      </p>
                    </div>
                  </div>

                  {/* Increase/Decrease Buttons */}
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
                    >
                      <FaPlus size={12}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Summary & Checkout */}
          <div className='flex-[1_1_auto] border'>
            {/* Bill Details */}
            <div className='bg-white p-4 flex flex-col gap-2 sticky top-5'>
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
                  <p>Handling Charge</p>
                </div>  
                <div className='flex items-center gap-2'>
                  <span>{displayCurrencyAndPrice(handlingCharge)}</span>
                </div>
              </div>

              <div className='font-semibold flex items-center justify-between gap-4 text-sm'>
                <p>Grand total</p>
                <p>{displayCurrencyAndPrice(totalAmount)}</p>
              </div>

              <div className='flex items-center justify-between px-4 py-2 bg-blue-100 font-semibold text-sm text-green-700 rounded-md'>
                <p>Your Total Savings</p> 
                <p>{displayCurrencyAndPrice(Number(totalSavings.toFixed(2)))}</p>
              </div>

            </div>

            {/* Total Price & Proceed Button */}
            {cart[0] && (
              <div className='p-2 bottom-5'>
                <div className='bg-green-700 text-neutral-100 px-4 py-3 font-bold text-base rounded-md flex items-center gap-4 justify-between'>
                    <div>
                      <div className='flex flex-col text-xs'>
                        <p className='text-xs'>Total</p>
                        <p>{displayCurrencyAndPrice(totalAmount)}</p>
                      </div>
                    </div>
                    <button className='flex items-center gap-1 text-base'>
                      Login to Proceed
                      <FaCaretRight />
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    )
}

export default Cart
