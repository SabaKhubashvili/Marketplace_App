import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props{
    label?:string,
    register:UseFormRegister<FieldValues>;
    errors:FieldErrors,
    disabled?:boolean
    id:string
    required?:boolean
    type?:string,
    isHigh?:boolean
}
export const AuthInput = ({label,disabled,register,errors,id,required,type='text',isHigh}:Props) => {

  return (
    <input type={type} className={` placeholder:text-[#545454] py-[14px] pl-[24px] rounded-[20px]
    border-[1px] border-solid  w-full text-[16px]  outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-300
    ${errors[id] ? 'border-rose-400 text-rose-400' : 'border-[#00997B]'}
    ${isHigh && 'h-[10rem] rounded-[20px] text-start'}
    `}
    {...register(id,{
      required,
      pattern: type === 'email'
            ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            : undefined
    })}
    disabled={disabled}
    placeholder={label} />
  )
}
