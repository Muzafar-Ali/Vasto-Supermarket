import InfiniteScroll from 'react-infinite-scroll-component';
import { useProductStore } from '@/store/prodcutStore';
import { TProduct } from '@/types/productTypes';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import SearchProductCards from './SearchProductCards';
import noProductsImage from '@/assets/nothing here yet.webp';
import Image from 'next/image';
import { Button } from '../ui/button';
import { IoClose } from 'react-icons/io5';

const SearchInput = () => {
  const { getSearchProducts } = useProductStore();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>('');
  const [productsSearched, setProductsSearched] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPages] = useState<number>(1);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput); // Update search term after delay
    }, 500); // 0.5-second delay
    return () => clearTimeout(handler); // Cleanup on every keystroke
  }, [searchInput]);

  // Reset page and products when search term changes
  useEffect(() => {
    setPage(1); // Reset page to 1
    setProductsSearched([]); // Clear previous search results
  }, [debouncedSearchInput]);

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const result = await getSearchProducts(debouncedSearchInput, page.toString(), (10).toString());
        if (page === 1) {
          setProductsSearched(result.products); // Reset results for new search
        } else {
          setProductsSearched((prevProducts) => [...prevProducts, ...result.products]); // Append new results
        }
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchInput) {
      getProducts();
    }
  }, [debouncedSearchInput, page]);

  // Fetch more data for infinite scroll
  const fetchMoreData = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1); // Increment page
    }
  };

  return (
    <div className='relative'>
      <Drawer open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DrawerTrigger>
          <div className="bg-white h-7 md:h-10 min-w-[100px] sm:min-w-[400px] lg:min-w-[600px] flex items-center gap-2 px-1 rounded-md text-primary-base md:pr-5">
            <BiSearch className="h-6 w-6 md:h-8 md:w-8" />
            <input
              type="text"
              placeholder="Search"
              className="h-10 rounded-md w-full outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {searchInput && (
              <IoClose 
                size={25} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchInput('');
                }}
              />
            )}
          </div>
        </DrawerTrigger>
        <DrawerContent className="top-0 max-w-[98%] md:max-w-[90%] mx-auto w-full rounded-t-lg shadow-lg scroll-auto">
          <DrawerHeader>
            <DrawerTitle asChild>
              <div className='flex flex-col gap-1 '>
                <div className='flex items-center'>
                  <div className="bg-white h-9 md:h-10 min-w-[100px] sm:min-w-[400px] lg:min-w-[600px] max-w-[80%] border-2 border-primary-base flex items-center gap-2 px-1 md:pr-5 mx-auto rounded-md text-[#F65831]/70">
                    <BiSearch className="h-6 w-6 md:h-8 md:w-8" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="h-6 lg:h-8 w-full outline-none"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                    {searchInput && <IoClose size={25} onClick={() => setSearchInput('')}/>}
                  </div>

                  <DrawerClose className='md:pr-10'>
                    <div className='md:hidden'>
                      <Button variant={'secondary'}>
                          <IoClose/>
                      </Button>
                    </div>
                    <div className='hidden md:block'>
                      <Button variant={'secondary'}>
                          Close
                      </Button>
                    </div>
                  </DrawerClose>
                </div>
                <p className='font-bold text-sm md:text-base pl-1 lg:pl-6 mt-5'> 
                  Results for <span className='text-primary-base capitalize'>"{debouncedSearchInput}"</span> 
                </p>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          {
            // No data
            !productsSearched[0] && !loading && (
              <div className='flex flex-col justify-center items-center w-full mx-auto'>
                <Image
                  src={noProductsImage}
                  alt='no data found'
                  className='w-full h-full max-w-xs max-h-xs block'
                />
                <p className='font-semibold my-2'>No Data found</p>
              </div>
            )
          }
          <InfiniteScroll
            dataLength={productsSearched.length}
            next={fetchMoreData}
            hasMore={page < totalPage}
            loader={undefined}
            scrollableTarget="scrollableDiv"
          >
            <div
              id="scrollableDiv"
              className="grid grid-cols-2 mobile-l:grid-cols-3 tablet-s:grid-cols-4 laptop-m:grid-cols-5 laptop-l:grid-cols-6 gap-4 max-h-[500px] overflow-y-auto py-4 px-4 lg:px-10 pb-50"
            >
              {productsSearched.map((product) => (
                <div key={product._id}>
                  <SearchProductCards product={product} onProductClick={() => setIsSearchOpen(false)} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SearchInput;