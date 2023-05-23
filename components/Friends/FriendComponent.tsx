import React from 'react'
import { MainButton } from '../Buttons/MainButton'
import { VerifiedIcon } from '@/public/Svg/Icons'
import { Follow } from '@prisma/client'
import { useSession } from 'next-auth/react'
import axios from 'axios'

interface Props{
    id:string,
    name:string
    isVerified:boolean
    image:string | null,
    followers:Follow[]
}

export const FriendComponent = ({id,name,image,isVerified,followers}:Props) => {

  const {data} = useSession()
  const [isFollowing,setIsFollowing] = React.useState<boolean>()
  const [isRequestPending,setIsRequestPending] = React.useState<boolean>(false)

  React.useEffect(()=>{
    if(data){
      let isFollowing = followers.some(follower=>follower.followerId === data?.user.id)
      setIsFollowing(isFollowing)
    }
  },[data])
 

  const onFollow = () =>{
    if(!isRequestPending){
      
      setIsRequestPending(true)
      axios.post('/api/user/follow',{userId:id})
      .then(res=>{
        setIsFollowing(true)         
      }).catch(error=>{
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
          setIsFollowing(true)          
        }).finally(()=>{
          setTimeout(()=>setIsRequestPending(false),300)
        })
  }
  }

  return (
    <div className=' col-span-1 flex items-center gap-5 xxs:flex-nowrap flex-wrap '>
      <div className='flex justify-start gap-[10px] w-full items-center '>

          {
            image ?
            <img src={image} className='crounded-full xxs:w-12 w-6' alt="userProfile" />
            :
            <img src="/Images/User/DefaultImage.webp" className='rounded-full  xxs:w-12 w-8 border-[1px] border-solid border-main'
            alt="userProfileDefault"/>
          }
          <p className='flex gap-[6px]'>
            {name}
            {
              isVerified &&
              <VerifiedIcon/>
            }
          </p> 
        </div>
        <MainButton onClick={isFollowing ? onUnfollow : onFollow} label={isFollowing ? 'Unfollow' : 'Follow'}/>
  </div>
  )
}
