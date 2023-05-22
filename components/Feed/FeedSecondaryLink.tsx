import React from 'react'

interface Props{
    onClick?:()=>void
    label:string,
    icon?:React.ReactNode,
    isActive?:boolean
}

export const FeedSecondaryLink = ({onClick,label,icon:Icon,isActive}:Props) => {
  return (
    <div className={`flex items-center gap-[16px] md:px-[30px] md:py-[16px] py-[13px] px-[24px]  w-fit border-[1px] border-solid rounded-[100px] cursor-pointer
    ${isActive ? 'dark:bg-[#03655229] bg-[#24B47E] text-white border-[#24B47E]': ' bg-transparent text-[#434343] border-[#434343]'} `}
     onClick={onClick}>
        <div>
          {Icon}
        </div>
        <div className='fond-semibold md:text-[18px] text-[13px]'>
          {label} 
        </div>
    </div>
  )
}
