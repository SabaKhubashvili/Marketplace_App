import { EmailIcon, GithubIcon, LinkedinIcon } from '@/public/Svg/Icons'
import React from 'react'

export const Contact = () => {
  return (
    <div className='flex gap-[40px]  flex-col'>
            <div className='flex gap-[20px] flex-col'>
                <h3 className='text-[28px] font-medium w-[17rem]'>
                    Adress & Personal Information
                </h3>
                <ul>
                    <li>Name: <span className='text-main pl-[10px]'>Saba</span></li>
                    <li>Lastname:<span className='text-main pl-[10px]'>Khubashvili</span> </li>
                    <li>Mobile: <span className='text-main pl-[10px]'>+995 598438788</span></li>
                    <li>Country: <span className='text-main pl-[10px]'>Georgia</span> </li>
                    <li>City: <span className='text-main pl-[10px]'>Tbilisi</span></li>
                    <li>Adress: <span className='text-main pl-[10px]'>9 Energetika St, Zahesi</span> </li>
                </ul>
            </div>
            <div className='flex gap-[20px] flex-col'>
                <h3 className='text-[28px] font-medium w-[17rem]'>
                    Social
                </h3>
                <ul>
                    <li><a target='_blank'  href="https://www.linkedin.com/in/sabakhubashvili/" className='flex items-center h-[4rem] gap-[10px] text-[1.7rem] font-medium text-main'> 
                        <span className='w-5'> <LinkedinIcon /></span> Linkedin</a>
                    </li>
                    <li><a target='_blank' href="mailto:khubashvili.saba12@gmail.com" className='flex items-center h-[4rem] gap-[10px] text-[1.7rem] font-medium  text-main'> 
                        <span className='w-6'><EmailIcon /></span> Email</a>
                    </li>
                    <li><a target='_blank' href="https://github.com/SabaKhubashvili" className='flex items-center h-[4rem] gap-[10px] text-[1.7rem] font-medium  text-main'> 
                        <span className='w-6'><GithubIcon /></span> Github</a>
                    </li>
                </ul>
            </div>
        </div>
  )
}
