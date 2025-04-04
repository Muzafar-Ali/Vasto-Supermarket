import { TProduct } from "@/types/productTypes";
import displayCurrencyAndPrice from "@/utils/displayCurrencyAndPrice";
import Image from "next/image";
import Link from "next/link";

const SearchProductCards = ({ product, onProductClick }: { product: TProduct; onProductClick: () => void }) => {

  return (
    <Link 
      href={`/product/${product.slug}/${product._id}`} 
      className='flex items-center justify-between w-full h-auto'
      onClick={onProductClick}
    >
      <div className="border p-1 grid gap-0.5 rounded-lg cursor-pointer shadow bg-white min-w-[130px] mobile-m:min-w-[160px] mobile-l:min-w-[120px] tablet-s:min-w-[140px] tablet-m:min-w-[160px] laptop-s:min-w-[200px] h-full lapts">
        {/* Image */}
        <div className="min-h-12 w-full max-h-12 lg:max-h-20 rounded overflow-hidden">
          <Image src={product?.imageUrl[0]} alt={product.name} width={500} height={500} className="h-full w-full object-scale-down transition-all duration-200"/>
        </div>

        {/* Quantity */}
        <div className="rounded text-[10px] w-fit py-[1px] px-1 text-green-600 flex flex-col lg:flex-row items-start lg:items-center gap-1 h-[40px] lg:h-auto">
          <div className="bg-green-100 rounded px-1 py-[1px] font-semibold">min 10</div> 
          {product.discount > 0 && <div className="bg-green-100 rounded px-1 py-[1px] font-semibold">{product.discount}% OFF</div>}
        </div>

          {/* Product Name */}
        <div className="font-medium text-[10px] text-ellipsis line-clamp-1">{product.name}</div>
        <div className="text-[10px]">{product.unit}</div> 
        {/* <div className='text-xs lg:text-sm w-fit'>{product.unit}</div>  */}

        {/* Price & Button */}
        <div className="flex items-center justify-between text-[10px]">
          <div className="font-semibold text-xs">{displayCurrencyAndPrice(product.price)}</div>
          <button className="bg-primary-base/80 hover:bg-primary-base text-white px-2 py-[2px] text-[10px] lg:text-xs rounded">Add</button>
        </div>
      </div>
    </Link>

  );
};

export default SearchProductCards