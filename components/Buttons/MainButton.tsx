import React from 'react'

interface Props{
    label:string
    isFull?:boolean
    disabled?:boolean,
    onClick?:()=>void
}

export const MainButton = ({label,isFull,disabled,onClick}:Props) => {
  return (
    <button className={`sm:py-[15px] md:px-[30px] sm:px-[25px] py-[9px] px-[16px]  transition-all duration-300
    rounded-[100px] bg-[#24B47E] font-medium text-[18px] text-white select-none disabled:cursor-not-allowed disabled:opacity-75
    ${isFull ? 'w-full text-[20px]' : 'w-fit'} 
    `}
    onClick={onClick}
    disabled={disabled}>
        {label}
    </button>
  )
}
