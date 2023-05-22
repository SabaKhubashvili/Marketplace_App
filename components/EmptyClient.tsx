import React from 'react'

interface Props{
    title:string
    description:string
}

export const EmptyClient = ({title,description}:Props) => {
  return (
    <section className='w-full flex flex-col gap-[10px] text-center justify-center items-center'>
        <div className='text-3xl font-bold'>
            {title}
        </div>
        <p className='text-md font-medium'>
            {description}
        </p>
    </section>
  )
}
