import React from 'react'
import { TrendingListComponent } from './TrendingListComponent'

export const TrendingList = () => {
  return (
    <section className='dark:bg-secondary bg-[#F2F2F2] pt-[23px] pb-[21px] px-[20px] flex flex-col gap-[38px] rounded-[10px]'>
        <h2 className='font-medium dark:text-[#FFF] dark:pl-[12px]'>
            Today Trending
        </h2>
        <div className='flex flex-col gap-[12px]'>
            <TrendingListComponent/>
        </div>
    </section>
  )
}
