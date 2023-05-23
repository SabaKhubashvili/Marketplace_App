import React, { useEffect, useState } from 'react'
import { CommentIcon, Dots, HeartIcon, HeartedIcon, LinkIcon, ReportIcon, SearchIcon, TrashIcon } from '@/public/Svg/Icons'
import { useTheme } from 'next-themes'
import { PostInterface } from '@/types'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { AnimateDropdown } from '../Dropdown/AnimateDropdown'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {motion} from 'framer-motion'
import { useRouter } from 'next/router'
import { CommentsSection } from '../Comments/Comments'

export const FeedComponent = ({
    id,
    title,
    description,
    image,
    publisher,
    Likes,
    PostComments
}:PostInterface) => {
    const {theme} = useTheme()
    const {data} = useSession() 
    
    
    const router = useRouter()

    const [likesLength,setLikesLength] = useState(Likes.length)
    const [hasMounted,setHasMounted] = useState<boolean>(false)
    const [dropdown,setDropdown] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false) 
    const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
    const [isPostLiked,setIsLiked] = useState<boolean>()
    const [showComments,setShowComments] = useState<boolean>(false)
    

   
    
    useEffect(()=>{
        if(!data || !data.user || !data.user.id){}else{

            setHasMounted(true)
            const isLiked = Likes.some((like) => like.userId === data.user?.id);
            setIsLiked(isLiked)
        }
        
    },[])
    const onDelete = () =>{
        setIsLoading(true)
        axios.post('/api/post/deletePost',{postId:id})
            .then(res=>{
                toast.success(res.data.message)
                router.reload()
            }).catch(error=>{
                toast.error(error.response.data.message)
            }).finally(()=>{
                setIsLoading(false)
            })

    }
    
    const onLike = () =>{
        
        if (!isRequestPending) {
            
        setIsRequestPending(true);
        axios.post('/api/post/likePost',{postId:id})
            .then(res=>{

                if(res.data.liked){
                    setLikesLength(prev => prev+1)
                    setIsLiked(true)
                    
                }else{
                    setIsLiked(false)
                    setLikesLength(prev => prev-1)
                }
            }).catch(error=>{
                toast.error(error.response.data.message)
            }).finally(()=>{
                setTimeout(() => setIsRequestPending(false), 300);
            })
        }
    }

    const dropdownBody = (
        <React.Fragment>
            {
                publisher.email === data?.user?.email &&
                <div className='text-red-500  flex items-center justify-between w-full cursor-pointer' onClick={onDelete}>
                   <div className='w-5'>
                    <TrashIcon/> 
                </div>
                    Delete
                </div>
            }
             <div className='dark:text-[#808080] text-[#181818]  flex items-center justify-between w-full'>
                   <div className='w-5'>
                    <ReportIcon isDark={hasMounted && theme==='dark'}/> 
                </div>
                    Report
                </div>
        </React.Fragment>
    )
  

  return (
    <div className={`col-span-1 py-[18px] px-[19px] h-fit dark:bg-secondary bg-white shadow-FeedComponent rounded-[8px] 
    flex flex-col gap-[24px] transition-opacity duration-300
    ${isLoading && 'opacity-75 cursor-not-allowed'}
    `}>
        <div className='flex flex-col gap-[17px]'>

            <div className='p-[10px] flex gap-[10px] items-center'>
                <div>
                    <img src={publisher.image ? publisher.image :"/Images/User/DefaultImage.webp"}
                     className='w-[38px] h-[38px] select-none' alt="" draggable={false} />
                </div>
                <div className='flex flex-col gap-[3px]'>
                    <h2 className='font-semibold text-[13px]'>
                    {title.length < 40 ? title : title.slice(0,40) + '...'}
                    </h2>
                    <p className='text-[#6E6E6E] text-[12px] font-medium'>
                        {publisher.name}
                    </p>
                </div>
            </div>
             <div className='px-[10px] dark:text-neutral-200'>
                { description.includes(' ') && description.length  > 50  ? description : description.slice(0,20) + '...'}
             </div>
            <div className='relative cursor-pointer '>
                <div className='w-full sm:h-[14rem] h-full peer'>
                    <Image 
                    src={image}
                    className='w-full h-full object-cover rounded-xl select-none ' 
                    alt={`${publisher.name} Post`}
                    draggable={false}
                    width={200}
                    height={150} />
        
                </div>
            <div className='absolute transition-all duration-300   peer-hover:flex hidden w-full h-full peer-hover:backdrop-blur-sm  bg-[#1E1E1ECC]   rounded-xl  z-50 top-0
            justify-center items-center gap-[22px]
            ' >
                <div className='flex flex-col gap-y-[7px] items-center'>
                    <div className='p-[17px] rounded-full border-[1px] border-solid border-white'>
                        <SearchIcon isDark/>
                    </div>
                    <p className=' italic text-[17px] font-medium'>
                        Preview
                    </p>
                </div>
                <div className='flex flex-col gap-y-[7px] items-center hover:scale-125'>
                    <div className='p-[17px] rounded-full border-[1px] border-solid border-white'>
                        <LinkIcon  />
                    </div>
                    <p className=' italic text-[17px] font-medium'>
                        Details
                    </p>
                </div>
            </div>

            </div>
        </div>
        <div className='flex  justify-between'>
            <div className='flex gap-[21px] '>
                <div className='flex gap-[7px] items-center'>
                    <div className='cursor-pointer flex items-center'>
                    <motion.button
                        className="like-button"
                        onClick={onLike}
                        animate={{ scale: isPostLiked ? 1.2 : 1 }}
                        transition={{ duration: 0.2 }}
                        >
                        {isPostLiked  ? <HeartedIcon /> : <HeartIcon  isDark={ hasMounted && theme === 'dark'}/> }
                    </motion.button>
                       
                    </div>
                    <p className='text-[16px] font-medium'>{likesLength}</p>
                </div>
                <div className='flex gap-[7px] items-center cursor-pointer' onClick={()=>setShowComments(prev=>!prev)}>
                    <CommentIcon isDark={hasMounted && theme === 'dark'}/>
                    <p className='text-[16px] font-medium'>{PostComments.length}</p>
                </div>
            </div>
            <div className='relative' >
                <div className=' p-[6px] cursor-pointer' onClick={()=>setDropdown(prev=>!prev)}>
                    <Dots/>
                </div>

                <AnimateDropdown isTop isRight isOpen={dropdown} body={dropdownBody}/>
            </div>
        </div>
        <CommentsSection showComments={showComments} productId={id} Comments={PostComments} isFeed />
    </div>
  )
}
