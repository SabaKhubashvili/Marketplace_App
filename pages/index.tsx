import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { SecondaryTextInput } from '@/components/Inputs/SecondaryTextInput'
import { TrendingProducts } from '@/components/LatestProducts/TrendingProducts'
import { Menu } from '@/components/Navbar/Menu/Menu'
import { Product } from '@/components/Posts/Product'
import { TagsSlider } from '@/components/Slider/TagsSlider/TagsSlider'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { FeedCreatePost } from '@/components/Feed/FeedCreatePost'
import getAllProducts from '@/actions/product/getAllProducts'
import { LoadingIcon } from '@/public/Svg/Icons/LoadingIcon'
import { ProductInterface } from '@/types'
import { useRouter } from 'next/router'
import { Tag } from '@prisma/client'


export default function Home() {
  const isAboveSemiLargeScreens = useMediaQuery('(min-width:1280px)')
  const isAboveSmallScreens = useMediaQuery('(min-width:640px)')
  const [hasMounted,setHasMounted] = useState<boolean>(false)
  const [showFilteredPosts,setShowFilteredPosts] = useState<boolean>(false)
  const [filteredProducts,setFilteredProducts] = useState<ProductInterface[]>()
  const router = useRouter()

    const{
      data:Products,
      isLoading:isProductsLoading
    } = getAllProducts()

    useEffect(()=>{
      setHasMounted(true)
  },[])
  

  const params = router.query
  
  useEffect(()=>{
    if(params.tag && !isProductsLoading){
      const filtered = Products.filter((product: ProductInterface) =>
        product.tags.some((tag: any) => tag.tag.name.includes(params.tag as string))
      );
      setFilteredProducts(filtered)
      setShowFilteredPosts(true )
    }
    
  },[params.tag])

  
  return (
    <React.Fragment>
        <Head>
          <title>Home</title>
          <meta property='og:title' content='Feed'  />
          <meta property='og:description' content='See our latest posts here'  />
        </Head>

        <main className='flex justify-between w-full h-full lg:pt-0 pt-[100px] '>
          <div className='w-full h-full  md:px-[23px] px-[10px] pt-[44px] xl:basis-2/3'>

            <h1 className='text-[32px]  font-semibold text-[#2A2A2A] dark:text-[#FFF]'>Explore</h1>
            {
              !isAboveSemiLargeScreens && hasMounted  &&
              <div className='pt-[20px] flex flex-col gap-[14px]'>
                <SecondaryTextInput label='Search by item' icon/>
                <TagsSlider/>
              </div>
            }
            <div className='mt-[43px] lg:overflow-y-scroll   min-h-[80%] lg:h-[90vh]  lg:scrollbar-hide lg:pr-[10px]   rounded-sm'>
              <FeedCreatePost setShowFilteredPosts={setShowFilteredPosts} showFilteredPosts={showFilteredPosts} isAboveSmallScreens={isAboveSmallScreens} />
                {
                isProductsLoading ?
                  
                <LoadingIcon/>

                :
              <div className='flex flex-col h-full gap-[57px] mt-[4rem]  mb-[40px] '>
                 {
                  filteredProducts && showFilteredPosts ?

                  filteredProducts.map((product:ProductInterface)=>(
                    <React.Fragment key={product.id}>
                      <Product  {...product} />
                    </React.Fragment>
                   ))
                  :
                  Products.map((product:ProductInterface)=>(
                  <React.Fragment key={product.id}>
                    <Product  {...product} />
                  </React.Fragment>
                 ))
}
              </div>
                }
            </div>
          </div>
            {isAboveSemiLargeScreens &&
              <div className='basis-1/3 w-[33%]'>

                  <Menu/>
                  <div className='w-full pt-[40px]'>

                  <TagsSlider/>
                  </div>
                  
                  <TrendingProducts/>
              </div>
            }
        </main>
    </React.Fragment>
  )
}
