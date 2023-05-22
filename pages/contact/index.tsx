import { Contact } from '@/components/Contact/Contact'
import { Menu } from '@/components/Navbar/Menu/Menu'
import Head from 'next/head'
import React from 'react'

const index = () => {
  return (
   <React.Fragment>
    <Head>
        <title>Contact</title>
        <meta property='og:title' content='Contact' />
        <meta property='og:description' content='Connect to this website creator' />
    </Head>
    <main className='w-full flex items-start justify-start  xl:pl-[4rem]'>
        <div className='flex flex-col gap-[80px] pt-[44px] '>

            <h2 className='text-[32px] font-semibold'>
                Contact
            </h2>
            <div className=''>
                <Contact/>
            </div>
        </div>
        <Menu/>
    </main>
   </React.Fragment>
  )
}

export default index