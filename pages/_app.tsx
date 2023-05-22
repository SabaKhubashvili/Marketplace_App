import React, { useState } from 'react'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { Navbar } from '@/components/Navbar/Navbar'
import { ThemeProvider } from 'next-themes'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { Container } from '@/components/Container'
import {LoginModal, RegisterModal } from '@/components/modals'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  const isAboveSemiLargeScreens = useMediaQuery('(min-width:1024px)')
  const [menu,setMenu] = useState<boolean>(false) 

  return(
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>

        <ThemeProvider enableSystem={true} attribute='class'>
          <Toaster/>
          <Container>
            <LoginModal />
            <RegisterModal/>   
                
            <div className='grid grid-cols-12  gap-[22px] font-Poppins'>

              <Navbar menu={menu} setMenu={setMenu}/>
              <div className={` flex justify-between gap-[39px] bg-[#F8F8F8]   dark:bg-[#121212] h-full overflow-y-hidden
              ${isAboveSemiLargeScreens && menu ? 'lg:col-start-4 lg:col-span-9 xl:col-span-10' : '!lg:col-start-3   lg:col-span-10 xl:col-span-11'}
              ${!isAboveSemiLargeScreens && 'col-span-12'}
              `}>
                <Component {...pageProps} />
              </div>
            </div>
          </Container>
        </ThemeProvider>
        
      </QueryClientProvider>
    </SessionProvider>
    ) 
}
