
import Wrapper from '../Wrapper'
import { IoMdClose } from "react-icons/io";
import { TProduct } from '@/types/productTypes';
import ProductCard from '../ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component'
import noDataImage from '@/assets/nothing here yet.webp'
import Image from 'next/image';

type SearchProps = {
  isSearchOpen: boolean,
  page: number,
  searchInput: string,
  products: TProduct[];
  loading: boolean;
  totalPage: number;
  debouncedSearchInput: string;
  setIsSearchOpen: (value: boolean) => void
  // setPage: (value: number) => void
  setPage: (value: number | ((prev: number) => number)) => void;
}

const Search = ({ 
  isSearchOpen, 
  page,
  searchInput,
  setIsSearchOpen, 
  setPage,
  products, 
  loading, 
  totalPage, 
  debouncedSearchInput }: SearchProps) => {

  const recentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
  console.log('recentSearches', recentSearches);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((prev: number) => prev + 1); 
    }
  };

  return (
    <Wrapper className={`fixed top-20 lg:top-30 xl:left-20 z-20 bg-white border rounded-md pb-10  ${isSearchOpen ? 'block' : 'hidden'}`}>

      {/* header */}
      <div className='flex items-center justify-between bg-green-100 p-2 rounded-t-md'>
        <p className='font-bold'> Results for "{debouncedSearchInput}" : {products?.length} products</p>
        <IoMdClose size={20} className='cursor-pointer bg-primary-base/50 rounded' onClick={() => setIsSearchOpen(false)}/>
      </div>

      <div className="max-h-[70vh] overflow-auto">
        <InfiniteScroll
          dataLength={products?.length || 0}
          hasMore={true}
          next={handleFetchMore} 
          loader={undefined}
        >
          <div className='grid grid-cols-1 mobile-m:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-4 gap-4'>
            {products.map((product: TProduct) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>

      {
      //no data 
        !products[0] && !loading && searchInput && (
          <div className='flex flex-col justify-center items-center w-full mx-auto'>
            <Image
              src={noDataImage}
              alt='no data found' 
              className='w-full h-full max-w-xs max-h-xs block'
            />
            <p className='font-semibold my-2'>No Data found</p>
          </div>
        )
      }
    </Wrapper>
  )
}

export default Search