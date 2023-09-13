import React from 'react'

import {tagsContstant} from '@/constants'

import { TagsSliderComponent } from './TagsSliderComponent'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode } from "swiper";
import getTags from '@/actions/tags/getTags';
import { Tag } from '@prisma/client';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export const TagsSlider = () => {

  const {
    data,
    isLoading
  } = getTags()
  const router = useRouter()
  const params = router.query

  const tag = params.tag

  const onChange = (value:string) =>{
    
    let currentQuery = {}
    if (params) {
      currentQuery = queryString.parse(params.toString())
    }
    
    
    const updatedQuery = {
      ...currentQuery,
      tag:value
    }
   
    
    const url = queryString.stringifyUrl({
      query:updatedQuery,
      url:'/'
    },{
      skipNull:true
    })

    router.push(url)

    
  }


  return (
      <Swiper
        slidesPerView='auto'
        spaceBetween={40}
        freeMode={true}
        modules={[FreeMode]}
        className='relative w-full'
      >
          { !isLoading &&

                data?.map((language:Tag)=>(
                  <SwiperSlide key={language.id} className='!w-20'>
                    <TagsSliderComponent isActive={tag === language.name} label={language.name} onClick={(value)=>onChange(value)} />
                  </SwiperSlide>
            ))
          }
          <div className='absolute right-0 top-0 h-full w-[4rem] bg-gradient-to-r 
          from-[#18181800] dark:to-[#181818] to-[#F8F8F8]  z-[1]' />
        </Swiper>
  )
}
