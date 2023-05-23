import { VerifiedIcon } from '@/public/Svg/Icons'
import { Follow } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
interface Props{
    id:string,
    title:string,
    author:string,
    image:string,
    createdAt:Date,
    followers:Follow[]
}

export const PopularProductsComponent = ({id,title,author,image,createdAt,followers}:Props) => {
    let currentTime = new Date()
    const postCreated = new Date(createdAt)

    

    const differenceInMinutes = Math.floor((currentTime.getTime() - postCreated.getTime()) / 60000)


    
  return (
    <div className='flex gap-[16px] w-full '>
        <div className='w-full h-full max-w-[10rem] max-h-[10rem] object-cover'>
            <img src={`${image}`} className='height-full object-cover w-full h-full rounded-lg' alt="" />
        </div>
        <div className='flex flex-col gap-[14px]'>
            <div className='text-[20px] font-medium'>
                { title.length >= 37 ?  title.slice(0,37) + '...' : title}
            </div>
            <div className='flex  gap-[6.7px] items-center'>
                <img src="/Images/Posts/Publisher-Logo.png" alt="" />
                <div className='flex flex-col gap-[1.83px]'>
                    <div className='flex items-center gap-[4px]'>
                        {author}
                        <VerifiedIcon/>
                    </div>
                    <div className='text-[#666666] font-medium text-[9px]'>
                        {followers.length} Followers
                    </div>
                </div>
            </div>
            <div className='flex gap-[14px] items-center'>
                <h3 className='text-third'>{differenceInMinutes >= 60 ? (differenceInMinutes/60).toFixed(1) + ' Hours ago' : differenceInMinutes + ' Minutes ago'}</h3>
                <div className='w-1 h-1 rounded-full bg-[#D9D9D9]' />
                <Link href={`/product/${id}`} className='text-third'>View Product</Link>
            </div>
        </div>
    </div>
  )
}
