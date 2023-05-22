import React from 'react'
import  { AnimatePresence,motion } from 'framer-motion'

interface Props{
    body:React.ReactNode
    isOpen:boolean
}

export const AnimateDropdown = ({body,isOpen}:Props) => {
  return (
    <AnimatePresence>
        {isOpen &&

            <motion.div
            initial={{opacity:0}}
            animate={{opacity:100}}
            exit={{opacity:0}}
            transition={{ duration: 0.2 }}
            className='absolute top-[4rem] right-0 rounded-lg dark:bg-secondary 
             bg-white px-6 py-3 flex flex-col gap-[10px]  text-right z-[10]'
            >
                {body}
        </motion.div>
        }

    </AnimatePresence>
  )
}
