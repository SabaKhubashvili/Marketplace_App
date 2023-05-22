import React from 'react'
import { TransparentButton } from '../Buttons/TransparentButton'
import { useSession } from 'next-auth/react'
import { useRegisterModal } from '@/hooks'
import { useRouter } from 'next/router'

export const SmallBanner = () => {

  const {data} = useSession()
  const registerModal = useRegisterModal()
  const router = useRouter()

  return (
    <div className='w-full bg-gradient-to-r from-[#00997B] to-[#24B47E] relative py-[35px] px-[31px] rounded-[10px] h-[15.5rem] flex
    before:content-LaptopWoman before:absolute before:right-4 before:top-0 before:z-[1] 2xl:after:content-Lines  after:absolute after:z-[0] after:right-2 after:top-0 
    '>
        <div className='basis-2/3 flex flex-col gap-[23px] pb-[10px]'>

            <h3 className=' font-extrabold italic 2xl:text-[28px] text-[20px] relative z-[2] text-white'>
                Become A Seller Today & Start Earning
            </h3>
            <div className='relative z-[2]'>

                <TransparentButton
                label='Apply Now'
                onClick={()=>{data ? router.push('/') : registerModal.onOpen()}}
                />
            </div>
        </div>
    </div>
  )
}
