"use client"
import InfiniteScroll from 'react-infinite-scroll-component';
import { useProductStore } from '@/store/prodcutStore';
import { TProduct } from '@/types/productTypes';
import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import SearchProductCards from './SearchProductCards';
import noProductsImage from '@/assets/nothing here yet.webp';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

const Search = () => {
  const { getSearchProducts } = useProductStore();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isRecentSearchOpen, setIsRecentSearchOpen] = useState<boolean>(false)
  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedSearchInput, setDebouncedSearchInput] = useState<string>('');
  const [productsSearched, setProductsSearched] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPages] = useState<number>(1);
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );

  /**
   * Debounces the search input to prevent excessive API calls.
   * Updates debouncedSearchInput 500ms after the user stops typing.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 500);
    
    // Cleanup function to clear the timeout if the component unmounts or searchInput changes
    return () => clearTimeout(handler);
  }, [searchInput]);

  /**
   * Resets pagination and product list when the debounced search term changes.
   * This ensures we start fresh with new search results.
   */
  useEffect(() => {
    setPage(1); // Reset page to 1
    setProductsSearched([]); // Clear previous search results
  }, [debouncedSearchInput]);

  /**
   * Fetches products based on the debounced search term and current page.
   * Handles both initial searches (page 1) and infinite scroll pagination.
   */
  useEffect(() => {
    const getProducts = async () => {
      // Only execute if there's a search term
      if (!debouncedSearchInput) return;
      
      try {
        setLoading(true);
        const result = await getSearchProducts(
          debouncedSearchInput, 
          page.toString(), 
          (10).toString()
        );

        // For first page, replace existing results
        if (page === 1) {
          setProductsSearched(result.products);
        } else {
          // For subsequent pages, append to existing results
          setProductsSearched((prevProducts) => [...prevProducts, ...result.products]);
        }
        
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [debouncedSearchInput, page]);

  /**
   * Fetches more data for infinite scroll when user reaches bottom of list.
   * Only executes if there are more pages available.
   */
  const fetchMoreData = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  // Get the latest recent searches from localStorage
  const latestRecentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]")
  
  /**
   * Removes a search term from recent searches in both localStorage and state.
   * @param term - The search term to remove
   */
  const handleRemoveRecentSearch = (term: string) => {
    const currentSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");  
    const updatedSearches = currentSearches.filter((item: string) => item !== term);
    
    // Update localStorage
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    
    // Update state to trigger re-render
    setRecentSearches(updatedSearches);
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
                <section className='flex items-center'>
                  <div className="bg-white h-9 md:h-10 min-w-[100px] sm:min-w-[400px] lg:min-w-[600px] max-w-[80%] border-2 border-primary-base flex items-center gap-2 px-1 md:pr-5 mx-auto rounded-md text-[#F65831]/70 relative">
                    <BiSearch className="h-6 w-6 md:h-8 md:w-8" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="h-6 lg:h-8 w-full outline-none"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onClick={() => setIsRecentSearchOpen(true)}
                      aria-label="Search products"
                      aria-controls="search-results"
                    />
                    {searchInput && (
                      <button
                        aria-label="Clear search in drawer"
                        onClick={() => {
                          setSearchInput('');
                          setIsRecentSearchOpen(false);
                        }}
                      >
                        <IoClose size={25}/>
                      </button>
                    )}

                    {/* Recent searches */}
                    <section
                      aria-label="Recent searches"
                      className={`absolute top-10 ${isRecentSearchOpen && !searchInput ? "block" : "hidden"}`}
                    >
                      <div className='flex gap-2 items-center flex-wrap gap-y-2 min-w-[210px] mobile-m:min-w-[260px] mobile-l:min-w-[270px] sm:min-w-[400px] lg:min-w-[590px] max-w-[80%] rounded-md px-5 text-sm text-gray-900 bg-white mt-2 border border-primary-base py-5'>
                      <p className='text-sm text-gray-600'>Recent Searches:</p>
                      {latestRecentSearches.map((item: string, index: number) => (
                        <div 
                          key={index} 
                          onClick={() => {
                            setSearchInput(item)  
                            setIsRecentSearchOpen(false)
                          }}
                          className='capitalize'
                          aria-label={`Recent search: ${item}`}
                        >
                          <div 
                            className='flex items-center border py-[0.5px] px-[6px] gap-2 rounded bg-primary-base/10' 
                            
                            >
                              <p className='cursor-pointer hover:text-primary-base'> {item} </p>
                            <button 
                              aria-label={`Remove ${item} from recent searches`}
                              className='cursor-pointer hover:text-primary-base border hover:border-primary-base rounded p-[1px]' 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveRecentSearch(item);
                                setSearchInput('');
                              }}
                            >
                              <IoClose size={15}/>
                            </button>
                            
                          </div>
                        </div>
                        ))}
                        </div>
                    </section>
                  </div>

                  <DrawerClose className='md:pr-10'>
                    <div className='md:hidden bg-primary-base/10 border ring ring-primary-base text-primary-base hover:bg-primary-base/50 hover:text-black px-2 lg:px-4 py-1 rounded'>
                      <IoClose/>
                    </div>
                    <div className='hidden md:block'>
                      <p className='bg-primary-base/10 border ring ring-primary-base text-primary-base hover:bg-primary-base/50 hover:text-black px-2 lg:px-4 py-1 rounded'>
                          Close
                      </p>
                    </div>
                  </DrawerClose>
                </section>
                <p className='font-bold text-sm md:text-base pl-1 lg:pl-6 mt-5'>
                  We found <span className="text-primary-base">{productsSearched.length} results</span> for: 
                  <span className="text-primary-base capitalize block mt-1">"{debouncedSearchInput}"</span>
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

export default Search;