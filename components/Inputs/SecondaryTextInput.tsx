import { SearchIcon } from '@/public/Svg/Icons'
import React from 'react'

interface Props{
    label?:string
    icon?:boolean
}
export const SecondaryTextInput = ({label,icon}:Props) => {
  return (
    <div className='relative'>

        <input type="text" className={` placeholder:text-[#969696] py-[14px] rounded-[100px]
        border-[1px] border-solid border-[#404040] w-full text-[16px]  outline-none dark:bg-[#212121]
        ${icon ? 'pl-14' : ' pl-[24px]'}
        `}
        placeholder={label} />
        { icon &&

            <div className='absolute left-5 top-[0.9rem] pointer-events-none'>
                <SearchIcon isDark />
         </div>
        }
    </div>
  )
}
