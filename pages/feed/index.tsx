import Head from 'next/head'
import React from 'react'

import useMediaQuery from '@/hooks/UseMediaQuery'
import { Menu } from '@/components/Navbar/Menu/Menu'
import { Feed } from '@/components/Feed/Feed'
import { TrendingList } from '@/components/Treding/TrendingList'
import { SmallBanner } from '@/components/Banners/SmallBanner'
import { useRouter } from 'next/router'

const Index = () => {
    const isAboveSemiLargeScreens = useMediaQuery('(min-width:1280px)')


      
  return (
    <React.Fragment>
        <Head>
            <title>Feed</title>
            <meta property='og:title' content='Feed' />
            <meta property='og:description' content='See all posts here' />
        </Head>
        <main className='w-full flex justify-between lg:pt-0 pt-[100px] '>
            <div className='xl:basis-8/12 w-full overflow-y-scroll min-h-[100%] lg:h-[100vh]'>
             <Feed/>
            </div>
            {
                isAboveSemiLargeScreens &&
                <div className='basis-4/12 w-[33%] flex flex-col gap-[50px] '>
                    <Menu/>
                    <div className='flex flex-col gap-[21px] pr-[20px]'>
                        <SmallBanner/>
                        <TrendingList/>
                    </div>
                </div>
            }
        </main>
    </React.Fragment>
  )
}

export default Index