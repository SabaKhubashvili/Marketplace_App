import useMediaQuery from '@/hooks/UseMediaQuery'
import { CartIcon, HamburgerIcon, LightModeIcon, NightModeIcon, SearchIcon } from '@/public/Svg/Icons'
import { useTheme } from 'next-themes'
import React, {useEffect, useState } from 'react'  
import { AnimatedInput } from '@/components/Inputs/AnimatedInput';
import { AnimateDropdown } from '@/components/Dropdown/AnimateDropdown';
import { useLoginModal, useRegisterModal } from '@/hooks';
import { signOut, useSession } from 'next-auth/react';
import queryString from 'query-string'
import { useRouter } from 'next/router';

export const Menu = () => {

    const {theme,setTheme} = useTheme()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const router = useRouter()

    const [hasMounted,setHasMounted] = useState<boolean>(false)
    const [showInput, setShowInput] = useState<boolean>(false);
    const [dropdown,setDropdown] = useState<boolean>(false)
    const [searchData,setSearchData] = useState<string>('')

    const {data} = useSession()
       
    const handleSearchClick = () => {
        setShowInput(!showInput);
      };
       const dropdownBody = (
        data ?
           <React.Fragment>
                 <div className='cursor-pointer' onClick={()=>{signOut()}}>
                Logout
            </div>
           </React.Fragment>
        :

        <React.Fragment>
            <div className='cursor-pointer' onClick={()=>{
                loginModal.onOpen()
                setDropdown(false)
                }}>
                Login
            </div>
            <div className='cursor-pointer' onClick={()=>{
                registerModal.onOpen()
                setDropdown(false)
                }}>
                Register
            </div>
        </React.Fragment>
      )
    const isAboveSemiLargeScreens = useMediaQuery('(min-width:1400px)')
    useEffect(()=>{
        setHasMounted(true)
    },[])


    const handleSearch = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(searchData.length === 0){
            return null
        }
        const query = {searchData}
        const url = queryString.stringifyUrl({
            url:'/feed',
            query:query
        },{
            skipNull:true
        })

        router.push(url)

        setShowInput(false)

        
    }

    if(!hasMounted){
        return null
    }

  return (
    <div className=' flex justify-end pt-[27px] pr-[46.16px] gap-[56px]  w-fit ml-auto'>
        <div className='flex justify-end gap-[28px] '>
            <div className='relative flex items-center'>
                    <form className='w-full h-2/3' onSubmit={handleSearch}>
                        <AnimatedInput showInput={showInput} 
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setSearchData(e.target.value)}}/>
                    </form>
                    <div className='rounded-full border-[1px] border-solid
                        border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
                        lg:p-[20px] p-[19px]  w-fit h-fit cursor-pointer relative z-[1]'
                        onClick={handleSearchClick}>
                        <SearchIcon isDark={theme === 'dark'}/>
                    </div>
            </div>
            <div className='rounded-full border-[1px] border-solid
            border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
            lg:p-[20px] p-[19px]  w-fit h-fit cursor-pointer relative z-[1]
            ' onClick={()=>{
                if(theme === 'dark'){
                    setTheme('light')
                }else{
                    setTheme('dark')
                }
            }}>
                {theme === 'dark'?
                <NightModeIcon/>
                    :
                <LightModeIcon/>
                }
            </div>
        </div>
        <div className='w-20 select-none relative flex items-center'>
            {data?.user ?
                    data.user.image ?
                <img src={data.user.image} className='cursor-pointer rounded-full' alt="" onClick={()=>{setDropdown(prev=>!prev)}} />
                :
                <img src="/Images/User/DefaultImage.webp" className='cursor-pointer rounded-full w-12 border-[1px] border-solid border-main' alt="" onClick={()=>{setDropdown(prev=>!prev)}} />
                :
                <div onClick={()=>{setDropdown(prev=>!prev)}} className='cursor-pointer w-12' >
                 <HamburgerIcon isDark={ theme==='dark'}/>
                </div>
            }

         <AnimateDropdown   isOpen={dropdown} body={dropdownBody}/>
        </div>
    </div>
  )
}
