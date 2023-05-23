import React from 'react'
import  { AnimatePresence,motion } from 'framer-motion'

interface Props{
    body:React.ReactNode
    isOpen:boolean
    isRight?:boolean
    isTop?:boolean
}

export const AnimateDropdown = ({body,isOpen,isRight,isTop}:Props) => {
  return (
    <AnimatePresence>
        {isOpen &&

            <motion.div
            initial={{opacity:0}}
            animate={{opacity:100}}
            exit={{opacity:0}}
            transition={{ duration: 0.2 }}
            className={`absolute ${isRight ? 'left-[20px]' : 'right-0'} ${isTop ? '-top-10' : 'top-[4rem]'} rounded-lg dark:bg-secondary 
             bg-white px-6 py-3 flex flex-col gap-[10px]  text-right z-[10]`}
            >
                {body}
        </motion.div>
        }

    </AnimatePresence>
  )
}
