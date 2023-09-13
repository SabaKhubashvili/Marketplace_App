import React, { useCallback } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { ImageIcon } from '@/public/Svg/Icons'

declare global {
    var cloudinary:any
}

interface Props{
    onChange:(value:string)=>void,
    value:string,
    isAboveSmallScreens?:boolean
    disabled?:boolean,
}

export const ImageInput = ({
    onChange,
    value,
    isAboveSmallScreens,
    disabled,
}:Props) => {
    const handleUpload = useCallback((result:any)=>{
        onChange(result.info.secure_url)
    },[onChange])


  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset='tmvy6l51'
    options={{
      maxFiles:1,
      resourceType:'image'
    
    }}
    
    >
      {({open})=>(
        <div
        onClick={()=> !disabled && open()}
        className="h-full"
      >
        <div className={`h-full cursor-pointer sm:px-[27px] sm:py-[12px] px-[16px] py-[12px] dark:bg-[#07543721] bg-[#F9F9F9] 
        flex gap-[10px] w-fit rounded-[88px] items-center
        ${disabled && 'cursor-not-allowed'}
        ${value && 'dark:bg-[#54ffbd2c] bg-[#ecebeb]'}
        `}>
            <ImageIcon/>
        {isAboveSmallScreens &&

            <div className='dark:text-white text-[#24B47E] font-medium text-[12px]'>
                Image
            </div>
            }
        </div>
      </div>
      )}

    </CldUploadWidget>
  )
}
