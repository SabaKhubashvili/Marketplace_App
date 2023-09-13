import React from 'react'
import { FriendComponent } from './FriendComponent'
import getAllUser  from '@/actions/user/getAllUser'
import { LoadingIcon } from '@/public/Svg/Icons/LoadingIcon'
import { UserInterface } from '@/types'

export const Friends = () => {

  const {
    data:users,
    isLoading:isUsersLoading
  } = getAllUser()
  
  return (
    <section className='pt-[44px]'>
       <h1 className='text-[32px] px-10  font-semibold text-[#2A2A2A] dark:text-[#FFF]'>Friends</h1>

       <div className='pt-[47px] px-10 grid md:grid-cols-2 grid-cols-1 gap-6'>
        {isUsersLoading ?
        <div className='md:col-span-2 col-span-1'>

          <LoadingIcon/>
        </div>
        :
          users?.map((user:UserInterface)=>(
            <FriendComponent key={user.id} id={user.id} name={user.name} image={user.image} isVerified={user.isVerified} followers={user.Follower} />
          ))
        }
       </div>
    </section>
  )
}
