'use client';
import Wrapper from '@/components/Wrapper';
import { useProductStore } from '@/store/prodcutStore';
import displayCurrencyAndPrice from '@/utils/displayCurrencyAndPrice';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import fastImage from "@/assets/minute_delivery.png"
import bestPriceImage from "@/assets/Best_Prices_Offers.png"
import basket from '@/assets/basket.png';
import priceWithDiscount from '@/utils/priceWithDiscount';
import { Separator } from '@/components/ui/separator';

const ProductDetailsPage = ({ params }: { params: Promise<{ id: string, slug: string }> }) => {
  const resolvedParams = use(params);
  const id = resolvedParams?.id;
  const slug = resolvedParams?.slug;

  const { product, getProductById } = useProductStore();
  
  const [image, setImage] = useState(0);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [isMagnifierVisible, setIsMagnifierVisible] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      await getProductById(id);
      if (product) {
        // setImage(product?.imageUrl[0]);
      }
    };
    if (id && slug) {
      getProduct();
    }
  }, [id, slug, getProductById]);

  // This function calculates the mouse position relative to the product image  
  // and updates the state to control the position of a magnifier effect. 
  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMagnifierPosition({ x, y });
  };
  
  return (
    <div className='bg-primary-base/5'>
      <Wrapper className='p-4 grid lg:grid-cols-2 gap-5'>
        {/* thumbnail */}
        <div className='flex flex-col gap-3 scroll-auto'>
          <div
            className='bg-white min-h-56 lg:min-h-[65vh] max-h-56 lg:max-h-[65vh] rounded-md h-full w-full relative'
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsMagnifierVisible(true)}
            onMouseLeave={() => setIsMagnifierVisible(false)}
          >
            {product?.imageUrl?.[image] && (
              <Image
                src={product.imageUrl[image]}
                alt={product.name}
                width={1000}
                height={1000}
                className='w-full h-full object-scale-down'
              />
            )}
                  
            {/* Highlighted Area Overlay */}
            {isMagnifierVisible && (
              <div
                className='highlight-area'
                style={{
                  position: 'absolute',
                  left: `${magnifierPosition.x}%`,
                  top: `${magnifierPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '100px', // Adjust size to match the magnifier's zoom area
                  height: '100px', // Adjust size to match the magnifier's zoom area
                  borderRadius: '50%', // Match the magnifier's shape
                  backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
                  border: '2px solid rgba(0, 0, 0, 0.5)', // Optional: Add a border
                  pointerEvents: 'none', // Ensure it doesn't block mouse events
                }}
              />
            )}

            {/* Magnifier Area */}
            {isMagnifierVisible && (
              <div
                className='magnifier'
                style={{
                  position: 'absolute',
                  // left: `${magnifierPosition.x}%`,
                  // top: `${magnifierPosition.y}%`,
                  left: `120%`,
                  top: `230px`,
                  transform: 'translate(-50%, -50%)',
                  width: '450px', // 👈 Increase width for a wider magnifier
                  height: '450px', // 👈 Increase height for a taller magnifier
                  borderRadius: '2%', // 👈 Optional: Make it less circular (use 50% for a circle)
                  border: '2px solid #ccc', // 👈 Optional: Adjust border
                  backgroundImage: `url(${product?.imageUrl[image]})`,
                  backgroundSize: '250% 250%', // 👈 Adjust zoom level (smaller % = more zoom)
                  backgroundPosition: `${magnifierPosition.x}% ${magnifierPosition.y}%`,
                  pointerEvents: 'none',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // 👈 Optional: Add shadow
                }}
              />
            )}
          </div>

          {/* small images */}
          <div className='grid relative'>
            <div className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
              {product?.imageUrl?.map((img, index) => (
                <div key={index} className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md'>
                  <Image
                    src={img}
                    alt={product?.name}
                    width={1000}
                    height={1000}
                    className='w-full h-full object-scale-down'
                    onClick={() => setImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className='my-4 hidden lg:grid gap-5 bg-white p-4 rounded-md'>
              <p className='font-semibold text-lg lg:text-xl'>Product Details</p>
            <div>
              <p className='font-semibold text-sm'>Description</p>
              <p className='text-base'>{product?.description}</p>
            </div>
            <div>
              <p className='font-semibold text-sm'>Unit</p>
              <p className='text-base'>{product?.unit}</p>
            </div>
            {
              product?.moreDetails && Object.keys(product?.moreDetails).map((element,index)=>(
                <div key={index}>
                  <p className='font-semibold text-sm'>{element}</p>
                  <p className='text-base'>{product?.moreDetails[element]}</p>
                </div>

              ))
            }
          </div>

        </div>
        
        {/* Right side - product details */}
        <div className='flex flex-col gap-3  p-4 lg:p-7 bg-white rounded-md lg:max-h-[700px]'>
          <div className='text-base lg:text-lg'>
            <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
            <h2 className='text-lg font-semibold lg:text-3xl'>{product?.name}</h2>  
            <p className='text-sm lg:text-base'>{product?.unit}</p> 
            {/* <Divider/> */}
            <Separator className='my-3'/>
            
            {/* price and discount*/}
            <div>
              <p className=''>Price</p> 
              <div className='flex items-center gap-2 lg:gap-4'>
              <div className='border border-green-600 px-2 lg:px-4 py-2 rounded bg-green-50 w-fit'>
                {product?.price !== undefined ? (
                  product.discount === 0 ? (
                    <p className='font-semibold text-sm lg:text-xl'>
                      {displayCurrencyAndPrice(product.price)}
                    </p>
                  ) : (
                    <p className='font-semibold text-sm lg:text-xl'>
                      {displayCurrencyAndPrice(priceWithDiscount(product.price, product.discount))}
                    </p>
                  )
                ) : (
                  <p className='font-semibold text-sm lg:text-xl'>
                    {displayCurrencyAndPrice(0)}
                  </p>
                )}
              </div>
                
                {
                 product && product?.discount > 0 && (
                    <p className='line-through text-sm lg:text-xl'>{displayCurrencyAndPrice(product?.price)}</p>
                  )
                }
                {
                  product && product?.discount > 0 && (
                    <p className="font-bold text-green-600 lg:text-2xl">{product?.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                  )
                }
                
              </div>
            </div> 
          </div>

          {
            product?.stock === 0 ? (
              <p className='text-lg text-red-500 my-2'>Out of Stock</p>
            ) 
            : (
              <div className='my-4'>
                <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
                {/* <AddToCartButton data={data}/> */}
              </div>
            )
          }

          {/****only mobile */}
          <div className='my-4 grid gap-3 lg:hidden rounded-md bg-white'>
            <div>
              <p className='font-semibold'>Description</p>
              <p className='text-base'>{product?.description}</p>
            </div>
            <div>
              <p className='font-semibold'>Unit</p>
              <p className='text-base'>{product?.unit}</p>
            </div>
            {
              product?.moreDetails && Object.keys(product?.moreDetails).map((element,index)=>{
                return(
                  <div>
                    <p className='font-semibold'>{element}</p>
                    <p className='text-base'>{product?.moreDetails[element]}</p>
                  </div>
                )
              })
            }
          </div>
          
          <h2 className='font-semibold'>Why shop from VAsto Supermarket? </h2>
          <div>
            <div className='flex  items-center gap-4 my-4'>
              <Image
                src={fastImage}
                alt='superfast delivery'
                className='w-20 h-20'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Superfast Delivery</div>
                <p>Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
              </div>
            </div>
            <div className='flex  items-center gap-4 my-4'>
              <Image
                src={bestPriceImage}
                alt='Best prices offers'
                className='w-20 h-20'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Best Prices & Offers</div>
                <p>Best price destination with offers directly from the nanufacturers.</p>
              </div>
            </div>
            <div className='flex  items-center gap-4 my-4'>
              <Image
                src={basket}
                alt='Wide Assortment'
                className='w-20 h-20 rounded-full border border-yellow-400'
              />
              <div className='text-sm'>
                <div className='font-semibold'>Wide Assortment</div>
                <p>Choose from 5000+ products across food personal care, household & other categories.</p>
              </div>
            </div>
          </div>
        </div>

      </Wrapper>
    </div>
  );
};

export default ProductDetailsPage;