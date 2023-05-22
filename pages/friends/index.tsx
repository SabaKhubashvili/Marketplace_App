import Head from 'next/head'
import React from 'react'
import { SmallBanner } from '@/components/Banners/SmallBanner'
import { Friends } from '@/components/Friends/Friends'
import { Menu } from '@/components/Navbar/Menu/Menu'
import { TrendingList } from '@/components/Treding/TrendingList'
import useMediaQuery from '@/hooks/UseMediaQuery'

const index = () => {
    const isAboveSemiLargeScreens = useMediaQuery('(min-width:1280px)')
    return (
    <React.Fragment>
         <Head>
            <title>Friends</title>
            <meta property='og:title' content='Friends' />
            <meta property='og:description' content='Make friends with people here' />
        </Head>
        

        <main className='flex justify-between w-full lg:pt-0 pt-[100px] '>
            <div className='xl:basis-8/12 w-full overflow-y-scroll h-[100vh]'>
                <Friends/>
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

export default index