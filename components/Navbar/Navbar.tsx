import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {motion} from 'framer-motion'
import {
  Arrow_Left,
  Arrow_Right,
  
  BookmarkedIcon,
  
  CloseIcon,
  ContactIcon,
  EmailIcon,
  ExploreIcon,
  FeedIcon,
  GithubIcon,
  HamburgerIcon,
  LightModeIcon,
  LinkedinIcon,
  MenuIcon,
  NightModeIcon,
  TopAuthorsIcon,
} from "@/public/Svg/Icons";
import Image from "next/image";
import useMediaQuery from "@/hooks/UseMediaQuery";
import { useTheme } from "next-themes";
import { AnimateDropdown } from "../Dropdown/AnimateDropdown";
import { useLoginModal, useRegisterModal } from "@/hooks";
import { signOut, useSession } from "next-auth/react";

interface Props{
  menu:boolean,
  setMenu:(value:boolean)=>void
}

export const Navbar = ({menu,setMenu}:Props) => {

  const router = useRouter();
  const {theme,setTheme} = useTheme()
  const {data} = useSession()
  const isAboveSemiLargeScreens = useMediaQuery('(min-width:1024px)')

  const [hasMounted,setHasMounted] = useState<boolean>(false)
  const [navMenu,setNavMenu] = useState<boolean>(false)
  const [dropdown,setDropdown] = useState<boolean>(false)

  
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const isActive = (url: string) => {
    return router.pathname === url;
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

    useEffect(()=>{
        setHasMounted(true)
    })


  return (
    <React.Fragment>

      <motion.nav 
      className={`${menu ? 'xl:col-span-2 lg:col-span-3' : 'xl:col-span-1 lg:col-span-2  '} 
      lg:pt-[38px] flex lg:static fixed   lg:flex-col items-center lg:justify-normal justify-between z-[89]    
      lg:gap-[118px] dark:bg-[#212121]
      lg:h-screen lg:min-h-[80%] lg:col-start-auto col-start-1 h-fit w-full col-span-12 lg:px-0 sm:px-[23px] px-[10px]`} >
        
        {
          !isAboveSemiLargeScreens && hasMounted &&
          <div className='rounded-full border-[1px] border-solid
          border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
          lg:p-[20px] p-[19px] w-fit h-fit
          '
          onClick={()=>{setNavMenu(true)}}
          >
                  <MenuIcon isDark={theme === 'dark'} /> 
              </div>
        }
        
        <Link href={'/'} className={`items-center xs:flex hidden ${menu ? 'justify-center' : 'justify-center'}  p-[24px] `}>
          {
            menu || !isAboveSemiLargeScreens && hasMounted ? 
            theme === 'dark' 
            ?
            <img src={'/images/main/logo_full.png'} alt="Logo_Full" className="  md:min-w-[8rem] w-[75px]  min-h-full" draggable={false} />
            :
            <img src={'/images/main/logo_full_light.png'} alt="Logo_Full" className="  md:min-w-[8rem] w-[75px]  min-h-full" draggable={false} />
            :
            <Image src={'/images/main/logo_shorted.png'}  alt="Logo_Shorted" width={50} height={50} className=" md:min-w-[2.5rem]  min-h-full"  draggable={false} />
          }
        </Link>
        { isAboveSemiLargeScreens ?

  <div className={`flex flex-col  ${menu ? 'items-start' : 'items-center'}
  ${menu ? '2xl:pl-10' : ''}  `}>
          <Link
            href={"/"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none 
            "
            >
            <ExploreIcon isActive={isActive("/")} />
            {
              menu &&
              <h2 className={`${isActive('/') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Explore
              </h2>
            }
          </Link>
          <Link
            href={"/friends"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <TopAuthorsIcon isActive={isActive("/friends")} />
            {
              menu &&
              <h2 className={`${isActive('/friends') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Friends
              </h2>
            }
          </Link>
          <Link
            href={"/feed"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <FeedIcon isActive={isActive("/feed")} />
            {
              menu &&
              <h2 className={`${isActive('/feed') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Feed
              </h2>
            }
          </Link>
          <Link
            href={"/contact"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <ContactIcon isActive={isActive("/contact")} />
            {
              menu &&
              <h2 className={`${isActive('/contact') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Contact
              </h2>
            }
          </Link>
          <Link
            href={"/bookmark"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <BookmarkedIcon isBig isDark={hasMounted && theme === 'dark'} isActive={isActive("/bookmark")}/>
            {
              menu &&
              <h2 className={`${isActive('/bookmark') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Bookmarks
              </h2>
            }
          </Link>
          <div className=" p-[24px] relative cursor-pointer select-none
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300 "
            onClick={()=>{
              if(menu){
                setMenu(false)
              }else{
                setMenu(true)
              }
            }}
            >
              {
                menu ?
                <div className="flex items-center gap-[17px]">
                  <Arrow_Left/>
                  <h2 className={`text-[21px] font-semibold text-secondary`} >
                    Close
                  </h2>
                </div>
                :
                <Arrow_Right/>
              }
          </div>
        
        </div>
        :
        <div className="flex gap-[24px]">
          <div className='rounded-full border-[1px] border-solid
              border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
              lg:p-[20px] p-[19px]  w-fit h-fit
              ' onClick={()=>{
                if(theme === 'dark'){
                  setTheme('light')
                }else{
                  setTheme('dark')
                }
              }}>{ hasMounted &&
                
                theme === 'dark' ? 
                <NightModeIcon/>
                :
                <LightModeIcon/>
              }
              </div>
              <div className='select-none relative flex items-center  justify-end'>
                  {
                  hasMounted ?
                  data?.user ?
                          data.user.image ?
                      <img src="/Images/User/User1.png" className='cursor-pointer rounded-full' alt="" onClick={()=>{setDropdown(prev=>!prev)}} />
                      :
                      <img src="/Images/User/DefaultImage.webp" className='cursor-pointer rounded-full w-12 border-[1px] border-solid border-main' alt="" onClick={()=>{setDropdown(prev=>!prev)}} />
                      :
                      <div onClick={()=>{setDropdown(prev=>!prev)}} className='cursor-pointer w-12' >
                      <HamburgerIcon isDark={ theme==='dark'}/>
                      </div>
                      :
                      ''
                  }

         <AnimateDropdown   isOpen={dropdown} body={dropdownBody}/>
        </div>
              
        </div>
    }
      {
            menu && isAboveSemiLargeScreens &&
            <div className="pt-[17px] pb-[30px] border-t-[1px] border-t-[#333333] border-solid text-[#6E6E6E] gap-2
            flex items-center flex-col">
              <p className=" font-bold">
                Made By Saba Khubashvili
              </p>
              <div className="flex gap-[10px] items-center">

                <a href="mailto:khubashvili.saba12@gmail.com" className="w-10 block">
                  <EmailIcon/>
                </a>
                <a href="https://github.com/SabaKhubashvili" target="_blank"  className="w-8">
                  <GithubIcon/>
                </a>
                <a href="https://www.linkedin.com/in/sabakhubashvili/" target="_blank" className="w-8">
                  <LinkedinIcon/>
                </a>
              </div>
            </div>
          }
      </motion.nav>
    {
      !isAboveSemiLargeScreens &&
        <div className={`fixed xs:w-[350px] w-full h-full bg-white dark:bg-secondary transition-transform duration-300 z-[90]
        xs:p-[30px] xss:p-[20px] p-[10px]
        flex flex-col justify-between
        ${navMenu ? 'translate-x-[0px] left-0 top-0' : '-translate-x-[500px] '}  `} >
          { hasMounted &&

            <div className="self-end w-8"
            onClick={()=>{setNavMenu(false)}}>
              <CloseIcon isDark={theme === 'dark'}/>
            </div>
            }
            <div>
          <Link
            href={"/"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none 
            "
            >
            <ExploreIcon isActive={isActive("/")} />
              <h2 className={`${isActive('/') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Explore
              </h2>
          </Link>
          <Link
            href={"/friends"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <TopAuthorsIcon isActive={isActive("/friends")} />
              <h2 className={`${isActive('/friends') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Friends
              </h2>
          </Link>
          <Link
            href={"/feed"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <FeedIcon isActive={isActive("/feed")} />
              <h2 className={`${isActive('/feed') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Feed
              </h2>
          </Link>
          <Link
            href={"/contact"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
            <ContactIcon isActive={isActive("/contact")} />
              <h2 className={`${isActive('/contact') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Contact
              </h2>
          </Link>
          <Link
            href={"/bookmark"}
            className=" p-[24px] relative
            hover:bg-gradient-to-r from-[#EEEEEE] dark:from-[#303030] dark:to-[#212121] to-[#FFFFFF] transition-all duration-300
            flex items-center gap-[17px] select-none"
            >
           <BookmarkedIcon isBig isDark={hasMounted && theme === 'dark'} isActive={isActive("/bookmark")}/>
              <h2 className={`${isActive('/bookmark') ? 'text-main' :  ' text-secondary'} 
              text-[21px] font-semibold
              `} >
                Bookmark
              </h2>
          </Link>
          
            </div>
            <div className="pt-[17px] pb-[30px] border-t-[1px] border-t-[#333333] border-solid text-[#6E6E6E] gap-2
            flex items-center flex-col">
              <p className=" font-bold">
                Made By Saba Khubashvili
              </p>
              <div className="flex gap-[10px] items-center">

                <a href="mailto:khubashvili.saba12@gmail.com" className="w-10 block">
                  <EmailIcon/>
                </a>
                <a href="https://github.com/SabaKhubashvili" className="w-8">
                  <GithubIcon/>
                </a>
                <a href="https://www.linkedin.com/in/sabakhubashvili/" className="w-8">
                  <LinkedinIcon/>
                </a>
              </div>
            </div>
        </div>
    }
  </React.Fragment>
  );
};
