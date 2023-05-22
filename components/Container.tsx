import React from 'react'
interface Props{
    children:React.ReactNode
}
export const Container = ({children}:Props) => {
  return (
    <div className='w-full max-w-[2560px] mx-auto h-full'>
        {children}
    </div>
  )
}
