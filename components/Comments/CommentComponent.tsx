import { User } from '@prisma/client'
import React from 'react'
import {motion} from 'framer-motion'
import { VerifiedIcon } from '@/public/Svg/Icons'

interface Props{
    index:number
    publisher:User
    comment:string
}

export const CommentComponent = ({
    index,
    publisher,
    comment,
}:Props) => {

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
    className='w-full flex gap-[20px] items-center'>
        <div>
        {publisher.image ?
                        <img src={publisher.image} className='cursor-pointer rounded-full' alt="" />
                        :
                        <img src="/Images/User/DefaultImage.webp" className='cursor-pointer rounded-full w-12 border-[1px] border-solid border-main' alt=""  />
        }
        </div>
        <div className=' text-third'>
          <h4 className='font-bold flex gap-[3px]'>{publisher.name} { publisher.isVerified && <VerifiedIcon/>}</h4>
          <p>{comment}</p>
        </div>
    </motion.div>
  )
}
