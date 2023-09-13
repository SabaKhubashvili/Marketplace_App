import { BookMarkIcon, BookmarkedIcon, LikeIcon, NotificationIcon, ShareIcon, VerifiedIcon } from '@/public/Svg/Icons'
import { CommentIcon } from '@/public/Svg/Icons/CommentIcon'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MainButton } from '../Buttons/MainButton'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { ProductInterface } from '@/types'
import {motion} from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { CommentsSection } from '../Comments/Comments'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Product = ({
    id,
    title,
    productLikes,
    publisher,
    image,
    comments,
    tags,
    bookmarkedBy
}:ProductInterface) => {
    const {theme} = useTheme();

    
    const {data} = useSession()
    
    const [likesLength,setLikesLength] = useState<number>(productLikes.length)
    const [hasMounted,setHasMounted] = useState<boolean>(false)
    const [showComments,setShowComments] = useState<boolean>(false)
    const [isLiked,setIsIsLIked] = useState<boolean>(productLikes.some((like) => like.userId === data?.user.id))
    const [isRequestPending, setIsRequestPending] = useState<boolean>(false);
    const [isBookmarked,setIsBookmarked] = useState<boolean>(bookmarkedBy.some((bookmark)=>bookmark.userId === data?.user.id))
    const [isFollowing,setIsFollowing] = React.useState<boolean>()
    const router = useRouter()
    const [ogUrl, setOgUrl] = useState("");

    const isUnderSmallSreens = useMediaQuery('(max-width:768px)')
    
    useEffect(()=>{
        setHasMounted(true)
    },[])
    useEffect(() => {
        const host = window.location.href;
        const baseUrl = `${host}`;
    
        setOgUrl(`${baseUrl}`);
      }, [router.pathname]);
 
    const onLike = () =>{
       
        if (!isRequestPending) {
            
        setIsRequestPending(true);
        axios.post('/api/product/likeProduct',{productId:id})
            .then(res=>{
                if(res.data.liked){

                    setIsIsLIked(true)
                    setLikesLength(prev=>prev+1)
                }else{
                    setIsIsLIked(false)
                    setLikesLength(prev=>prev-1)
                }
            }).catch(error=>{
                toast.error(error.response.data.message)
            }).finally(()=>{
                setTimeout(() => setIsRequestPending(false), 300);
            })
        }
    }
    const onBookmark = () =>{
        if (!isRequestPending) {

            setIsRequestPending(true);
            axios.post('/api/product/addBookmark',{productId:id})
                .then(res=>{
                    setIsBookmarked(true)
                    toast.success(res.data.message)
                }).catch(error=>{
                    toast.success(error.response.data.message)
                }).finally(()=>{
                    setTimeout(()=>setIsRequestPending(false),300)
                })
        }
    }
    const removeBookmark = () =>{
        if (!isRequestPending) {

            setIsRequestPending(true);
            axios.post('/api/product/removeBookmark',{productId:id})
                .then(res=>{
                    setIsBookmarked(false)
                    toast.success(res.data.message)
                }).catch(error=>{
                    toast.success(error.response.data.message)
                }).finally(()=>{
                    setTimeout(()=>setIsRequestPending(false),300)
                })
        }
    }
    const onFollow = () =>{
        if(!isRequestPending){
          
          setIsRequestPending(true)
          axios.post('/api/user/follow',{userId:id})
          .then(res=>{
            setIsFollowing(true)         
          }).catch(error=>{
            toast.error(error.response.data.message)
            setIsFollowing(false)          
          }).finally(()=>{
            setTimeout(()=>setIsRequestPending(false),300)
          })
        }
      } 
      const onUnfollow = () =>{
        if(!isRequestPending){
          setIsRequestPending(true)
            axios.post('/api/user/unfollow',{userId:id})
            .then(res=>{
              setIsFollowing(false)        
            }).catch(error=>{
              toast.error(error.response.data.message)
              setIsFollowing(true)          
            }).finally(()=>{
              setTimeout(()=>setIsRequestPending(false),300)
            })
      }
      }

    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(`${ogUrl}product/${id}`);
          toast.success('Link Copied')
        } catch (error) {
          toast.error('Failed to copy link')
        }
      };
    

    if(!hasMounted){
        return null
    }
    
  return (
    <section className=' w-full flex flex-col gap-[14px]'>
        <Link href={`/product/${id}`} className='w-full h-[440px]'>
            <Image src={image}  alt='Post'
            className='w-full h-full object-cover !static rounded-[10px]'
            fill
            />
        </Link>
        <div className='flex flex-col gap-[21px]'>
            <div className='flex justify-between items-center md:flex-row flex-col'>
                <div>

                    <h2 className='font-semibold md:text-[32px] sm:text-[22px] text-[18px] basis-1/2'>
                        {title}
                    </h2>

                    <ul className='flex gap-[10px]'>
                        {
                            tags?.map((singletag:any)=>(
                                <li className='text-secondary' key={singletag.tag.id}>
                                {singletag.tag.name},
                             </li>   
                            ))
                        }
                        </ul>
                </div>

                <div className='flex gap-[26px] '>
                    <div className='flex gap-[14px] items-center'>
                        {/* Like */}
                        <motion.button 
                        onClick={onLike}
                        animate={{scale:isLiked ? 1.2 : 1}}
                        transition={{duration:0.2}}
                        >
                            <LikeIcon isLiked={isLiked}  isSmall={isUnderSmallSreens} isDark={hasMounted && theme === 'dark'}/>
                        </motion.button >

                        <span className='font-semibold text-[20px]'>
                          {likesLength}
                        </span>
                    </div>
                    <div className='flex gap-[14px] items-center cursor-pointer' onClick={()=> data ? setShowComments(prev=>!prev) : toast.error('Unauthorized')}>
                        {/* Comment */}
                        <CommentIcon isSmall={isUnderSmallSreens} isDark={hasMounted && theme === 'dark'}  />
                        <span className='font-semibold text-[20px]'>
                            {comments.length}
                        </span>
                    </div>
                </div>
            </div>
            <div className='flex justify-between  flex-wrap xs:gap-y-[17px] gap-y-[25px]'>
                {/* Under Section */}
                <div className='flex items-center gap-[11px]'>
                    <div className='w-10 h-10 rounded-full'>
                    {publisher.image ?
                        <img src={publisher.image} className='cursor-pointer rounded-full' alt="" />
                        :
                        <img src="/Images/User/DefaultImage.webp" className='cursor-pointer rounded-full w-12 border-[1px] border-solid border-main' alt=""  />
                    }
                    </div>
                    <div>
                        <div className='flex gap-[3px] items-center'>
                            <h3 className='font-semibold md:text-[24px] sm:text-[16px] text-[12.2905px]'>{publisher.name}</h3> 
                            {
                                publisher.isVerified &&
                                <VerifiedIcon/>
                            }
                        </div>
                        <p className='text-[#666666] text-[14px] font-medium'>
                            {publisher.Follower.length} Followers
                        </p>
                    </div>
                </div>
                <div className='flex xxs:items-center xxs:gap-[34px] gap-[20px] xxs:flex-row flex-col '>
                    {/* Under Right Section */}
                    <div className='flex gap-[24px]'>
                        <motion.div 
                        animate={{scale:isBookmarked ? 1.2 : 1}}
                        transition={{duration:0.2}}
                        className='rounded-full border-[1px] border-solid
                            border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
                            lg:p-[20px] md:p-[19px] p-[12px]  w-fit h-fit cursor-pointer
                            ' onClick={isBookmarked ? removeBookmark : onBookmark }>
                            {isBookmarked
                                ?
                            <BookmarkedIcon  isDark={theme === 'dark'} isSmall={isUnderSmallSreens}/>
                            :
                            <BookMarkIcon  isDark={theme === 'dark'} isSmall={isUnderSmallSreens}/>
                        }
                        </motion.div>
                        <div className='rounded-full border-[1px] border-solid
                            border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
                            lg:p-[20px]  md:p-[19px] p-[12px]  w-fit h-fit  cursor-pointer
                            '
                            onClick={handleCopy}
                            >
                            <ShareIcon isDark={theme === 'dark'} isSmall={isUnderSmallSreens}/>
                        </div>
                        <div className='rounded-full border-[1px] border-solid
                            border-[#ECECEC] dark:border-[#212121] bg-[#F8F8F8] dark:bg-[#171717]
                            lg:p-[20px]  md:p-[19px] p-[12px]  w-fit h-fit
                            '>
                            <NotificationIcon isDark={theme === 'dark'} isSmall={isUnderSmallSreens}/>
                        </div>
                    </div>
                    {data?.user.id !== publisher.id && 

                        <div className='xs:order-none order-first'>
                          <MainButton onClick={isFollowing ? onUnfollow : onFollow} label={isFollowing ? 'Unfollow' : 'Follow'}/>
                    </div>
                    }
                </div>
            </div>
            <CommentsSection Comments={comments} showComments={showComments} productId={id}/>
        </div>
    </section>
  )
}
