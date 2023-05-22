import Head from 'next/head'
import React from 'react'
import getBookmarks from '@/actions/product/getBookmarks'
import { EmptyClient } from '@/components/EmptyClient'
import { useSession } from 'next-auth/react'
import { LoadingIcon } from '@/public/Svg/Icons/LoadingIcon'
import { ProductInterface } from '@/types'
import { Product } from '@/components/Posts/Product'

const index = () => {

  const {
    data:Products,
    isLoading,
  } = getBookmarks()
  
  const {data:userData} = useSession()
  if(isLoading){
    return <LoadingIcon/>
  }

    if(userData){
      return (
        <React.Fragment>
    
          <Head>
            <title>Bookmarks</title>
            <meta property='og:title' content='Products with Bookmark' />
            <meta property='og:description' content='Save products for later' />
          </Head>
          <main className='w-full h-full flex flex-col justify-start md:px-[23px] px-[10px] pt-[44px] gap-[55px] '>
          <h1 className='text-[32px]  font-semibold text-[#2A2A2A] dark:text-[#FFF]'>Bookmarks</h1>

            <div className='h-full overflow-y-scroll flex flex-col gap-[20px]'>

              { Products.length > 0
              ?
                Products.map((product:any)=>(
                  <Product key={product.product.id} {...product.product as ProductInterface} />
                  ))
                  :
                  <EmptyClient
                  title='There are no bookmarks'
                  description='Try and bookmark something'
                  />
                }
                </div>
          </main>
        </React.Fragment>
    
      )
     
    }else{
      return <EmptyClient
      title='Not authorized'
      description='Login or Register to use this feature'
      />
    }
 

}

export default index