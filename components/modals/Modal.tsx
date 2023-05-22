import { CloseIcon } from '@/public/Svg/Icons'
import { useTheme } from 'next-themes'
import React, { use, useCallback, useEffect, useState } from 'react'
import { MainButton } from '../Buttons/MainButton'


interface Props{
    isOpen:boolean,
    title?:string,
    subTitle?:string,
    body:React.ReactNode,
    footer:React.ReactNode
    onClose:()=>void,
    onSubmit:()=>void,
    disabled?:boolean,
    showSubmit?:boolean
}

export const Modal = ({
    isOpen,
    title,
    subTitle,
    body,
    footer,
    onClose,
    onSubmit,
    disabled,
    showSubmit
}:Props) => {

    const [showModal,setShowModal] = useState<boolean>(false)
    const {theme} = useTheme()
    useEffect(()=>{
        setShowModal(isOpen)
    },[isOpen])

    const handleClose = useCallback(()=>{
        if(disabled){
            return null
        }
        onClose()
    },[disabled,onClose])
    const handleSubmit = useCallback(()=>{
        if(disabled){
            return null
        }
        onSubmit()
    },[disabled,onSubmit])

    if(!isOpen){
        return null
    }

  return (
    <section className='flex justify-center overflow-y-auto items-center w-full h-full fixed outline-none   
    inset-0 bg-neutral-900/70 z-[99]'>

        <div className='  md:w-4/6 lg:w-3/6 xl:w-2/5 w-full my-6 mx-auto h-full md:h-auto'>
            <div className={`
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            transition-all duration-300 h-full
            `}>
                <div className='bg-white dark:bg-secondary w-full h-full
                py-[20px] px-[16px] rounded-[10px] shadow-lg flex justify-center items-start flex-col gap-[20px]
                '>
                    <div className='flex justify-between w-full'>

                        <div className=' text-[#484747] dark:text-white font-medium text-[26px]'>
                            {title}
                            <p className='text-secondary pt-[6px] text-[14px] italic'>
                                {subTitle}
                            </p>
                        </div>
                        <div onClick={handleClose} className='w-6 cursor-pointer'>
                            <CloseIcon isDark={theme === 'dark'}/>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-[10px]'>
                        {body}
                    </div>
                    <div className='flex flex-col w-full gap-[15px] '>
                        {
                            showSubmit &&
                        <div className='w-full' onClick={handleSubmit}>
                            <MainButton label='Submit' isFull disabled={disabled}/>
                        </div>
                        }
                        <div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
