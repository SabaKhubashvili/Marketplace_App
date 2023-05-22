import React from 'react'
import {AnimatePresence,motion } from 'framer-motion';

interface Props{
    showInput:boolean,
    onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
export const AnimatedInput = ({showInput,onChange}:Props) => {
  return (
    <AnimatePresence>
    {showInput && (
        <motion.input
            onChange={onChange}
            id='Search'
            type="text"
            className='right-[5rem] absolute h-2/3 z-[0] rounded-xl outline-none 
            px-5 placeholder:text-[#969696] dark:bg-[#212121] 
            text-[16px]  border-[#404040]'
            key="searchInput"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%', opacity:0 }}
            transition={{ duration: 0.3 }}
            placeholder='Search by title'
        />
    )}
</AnimatePresence>
  )
}
