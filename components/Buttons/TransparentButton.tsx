import Link from 'next/link'
import React from 'react'

interface Props{
  label:string
  onClick?:()=>void
}

export const TransparentButton = ({label,onClick}:Props) => {
  return (
      <div className='px-[34px] py-[14px] rounded-[100px] border-[1px] border-solid border-white w-fit text-white cursor-pointer
      hover:bg-white hover:text-main transition-colors duration-200'
      onClick={onClick}
      >
        {label}
      </div>
  )
}
