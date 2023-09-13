import React from 'react'
import { PopularProductsComponent } from './PopularProductsComponent'
import getTrendingProducts from '@/actions/product/getTrendingProducts'
import { ProductInterface } from '@/types'

export const TrendingProducts = () => {

  const {
    data:products,
    isLoading
  } = getTrendingProducts()


  if(isLoading){
    return null
  }

  return (
    <React.Fragment>
            <div className='pt-[25px] flex flex-col gap-[16px]'>
                <h2 className='py-[14px] px-[20px] font-semibold text-[23px] text-[#2A2A2A] dark:text-[#FFF]'>
                Popular  Products
                </h2>
                <div className='flex flex-col gap-[26px] overflow-y-scroll h-[64vh] rounded-sm'>
                  { products?.map((product:ProductInterface)=>(
                      <PopularProductsComponent
                      key={product.id}
                      id={product.id}
                      title={product.title}
                      author={product.publisher.name}
                      image={product.image}
                      createdAt={product.createdAt}
                      followers={product.publisher.Follower}
                      />
                    ))
                  }
                </div>
            </div>
          </React.Fragment>
  )
}
