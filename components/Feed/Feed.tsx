import React from 'react'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { FeedCreatePost } from './FeedCreatePost'
import { FeedComponent } from './FeedComponent'
import getAllPosts from '@/actions/post/GetAllPosts'
import { PostInterface } from '@/types'
import { LoadingIcon } from '@/public/Svg/Icons/LoadingIcon'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'


export const Feed = () => {
    const isAboveSmallScreens = useMediaQuery('(min-width:640px)')
    const [filteredPosts,setFilteredPosts] = React.useState<PostInterface[]>()
    const [showFilteredPosts,setShowFilteredPosts] = React.useState<boolean>()
    const router = useRouter()
    const{
      data,
      isLoading,
      isError
    } = getAllPosts()
    
    React.useEffect(()=>{
      if(!isLoading && router.query.searchData){
        
        const filteredData = data.filter((post:PostInterface)=>( post.title.includes(router.query.searchData as string)))
        if(filteredData.length !== 0){
          setShowFilteredPosts(true)
          setFilteredPosts(filteredData)
        }else{
          toast.error('There are not product with same title')
        }
      }
    },[router.query.searchData])
    
  return (
    <div className='w-full   md:px-[23px] px-[10px] pt-[44px]'>
    <h1 className='text-[32px]  font-semibold text-[#2A2A2A] dark:text-[#FFF]'>Feed</h1>
    
    <div className='pt-[47px]'>
       <FeedCreatePost isFeedPost showFilteredPosts={showFilteredPosts} setShowFilteredPosts={setShowFilteredPosts} isAboveSmallScreens={isAboveSmallScreens}/>
    </div>
    <div className='pt-[25px] grid sm:grid-cols-2 grid-cols-1 gap-[19px]'>
       {
        isLoading ?
        <div className='w-full sm:col-span-2 col-span-1 h-full flex items-center justify-center'>
          <LoadingIcon/>
        </div>
        :
        showFilteredPosts && filteredPosts ? 
          filteredPosts.map((post:PostInterface)=>(
            <FeedComponent key={post.id} {...post}/>
          ))
            :
          data.map((post:PostInterface)=>(
              <FeedComponent key={post.id} {...post}/>
            ))
       }
    </div>
</div>
  )
}
