import React from 'react'

interface Props{
    label?:string
}
export const TextInput = ({label}:Props) => {
  return (
    <input type="text" className=' placeholder:text-[#545454] py-[14px] pl-[24px] rounded-[100px]
    border-[1px] border-solid border-[#00997B] w-full text-[16px]  outline-none
    '
    placeholder={label} />
  )
}
