import React, { useEffect, useState } from 'react'
import { MainButton } from '../Buttons/MainButton'
import { ExploreIcon, ImageIcon, SearchIcon, TagIcon } from '@/public/Svg/Icons'
import { FeedSecondaryLink } from './FeedSecondaryLink'
import { useTheme } from 'next-themes'
import useMediaQuery from '@/hooks/UseMediaQuery'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AuthInput } from '../Inputs/AuthInput'
import { ImageInput } from '../Inputs/ImageInput'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { AnimateDropdown } from '../Dropdown/AnimateDropdown'
import getTags from '@/actions/tags/getTags'
import { Tag } from '@prisma/client'


interface Props{
    isAboveSmallScreens:boolean,
    setShowFilteredPosts:(value:boolean)=>void,
    showFilteredPosts?:boolean,
    isFeedPost?:boolean
}

export const FeedCreatePost = ({isAboveSmallScreens,setShowFilteredPosts,showFilteredPosts,isFeedPost}:Props) => {
    const {theme} = useTheme()
    const router = useRouter()

    const isAboveMediumScreens = useMediaQuery('(max-width:768px)')
    const [hasMounted,setHasMounted] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [isTagsDropdownOpen,setTagsDropdown] = useState<boolean>(false)
    const{
        data:tags,
        isLoading:isTagsLoading
    } = getTags()
    
    const {
        register,
        setValue,
        reset,
        handleSubmit,
        watch,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
            defaultValues:{
                title:'',
                description:'',
                image:'',
                tags:[]
            }
        })  

        const image = watch('image')
        const givenTags = watch('tags')

        const setCustomValue = (id:string,value:any) =>{
            setValue(id,value,{
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
        }
    
    const tagsDropdown = (

            <div className='h-[10rem] w-[10rem] flex flex-col gap-[6px] overflow-y-scroll text-left '>
                { !isTagsLoading ?
                    tags.map((tag:Tag)=>(
                        <p key={tag.id} className='flex justify-between'>
                            {tag.name}

                            <input
                             type="checkbox" 
                             checked={givenTags.includes(tag.id)}
                             disabled={givenTags.length >= 5 && !givenTags.includes(tag.id)}
                             onChange={()=>{
                                if(givenTags.includes(tag.id)){
                                    setCustomValue('tags',givenTags.filter((v:string) => v !== tag.id))
                                }else{
                                    if(givenTags.length <  5 ){

                                        setCustomValue('tags',[...givenTags,tag.id])
                                    }else{
                                        toast.error('Cant attach more than 5 tags')
                                    }
                                }
                                
                                }} />
                        </p>
                    ))
                    :
                    'Loading'
                }
            </div>
    )

    

    

        
        const onSubmit:SubmitHandler<FieldValues> = (data) =>{
            if(image.length <= 0){
                return toast.error('Image is required')
            }
            if(givenTags.length === 0 && !isFeedPost){
                return toast.error('At least one tag is required')
            }
            
            setIsLoading(true)
            
            axios.post(`/api/${isFeedPost ? 'post/createPost' : 'product/createProduct'}`,data)
            .then(res=>{
                    toast.success(res.data.message)   
                    router.reload()
                    reset()
                }).catch(error=>{
                    toast.error(error.response.data.message)

                }).finally(()=>{
                    setIsLoading(false)
                })
                
            }
            
            
            useEffect(()=>{
                setHasMounted(true)
            },[])
            return (
    <div className={`flex flex-col gap-[7px] ${isLoading && 'opacity-75'} transition-all duration-300 `}>
    <div className=' bg-gradient-to-r dark:from-[#292929] dark:to-[#252525] bg-white
    sm:pl-[37px] sm:pt-[27px] sm:pb-[29px] sm:pr-[41px]  py-[16px] rounded-[20px]
    '>
        <div className='sm:px-[20px] px-[10px] py-[10px] flex gap-[12px] items-center'>
            { isAboveSmallScreens &&

                <div className=''>
                <img src="/Images/Posts/Publisher-Logo.png" alt="UserLogo" />
            </div>
            }
            <AuthInput label='Write something... ?' id='title' register={register} required errors={errors}/>
        </div>
        <div className='sm:px-[20px] px-[10px] py-[10px] flex gap-[12px] items-center'>

            <AuthInput isHigh label='Write Description... ?' id='description' register={register} required errors={errors}/>
        </div>
    </div>
    <div className=' bg-gradient-to-r dark:from-[#292929] dark:to-[#252525] bg-white p-[27px] rounded-[20px] flex justify-between'>
        <div className=' flex gap-[12px]'>

            <div className='h-full'>
                <ImageInput
                 disabled={isLoading} 
                 onChange={(value)=>{setCustomValue('image',value)}}
                 value={image}
                 isAboveSmallScreens={isAboveSmallScreens}/>
            </div>
            { !isFeedPost &&

                <div className='h-full relative'>
                <div 
                onClick={()=>setTagsDropdown(prev=>!prev)}
                className='h-full cursor-pointer sm:px-[27px] sm:py-[12px] px-[16px] py-[12px] dark:bg-[#07543721] bg-[#F9F9F9] 
                flex gap-[10px] w-fit rounded-[88px] items-center select-none'>
                    <div className='w-6'>
                        <TagIcon/>
                    </div>
                      {isAboveSmallScreens &&
                        <div className='dark:text-white text-[#24B47E] font-medium text-[12px]'>
                            Tag
                        </div>
                        }
                </div>
                    <AnimateDropdown  isOpen={isTagsDropdownOpen} body={tagsDropdown}/>
            </div>
                        }
        </div>
        <div>
            <MainButton label='Post' onClick={handleSubmit(onSubmit)} disabled={isLoading} />
        </div>
    </div>  
    <div className='flex gap-[20px] pt-[10px] xxs:flex-row flex-col '>
            <FeedSecondaryLink onClick={()=>{setShowFilteredPosts(false)}} label='All' isActive={!showFilteredPosts} icon={<ExploreIcon isSmall={isAboveMediumScreens}  color={hasMounted && theme === 'dark' ? '#FFF' : !showFilteredPosts ? '#FFF' : '#24B47E'} />} />
            <FeedSecondaryLink onClick={()=>{setShowFilteredPosts(true)}} label='Search'isActive={showFilteredPosts} icon={<SearchIcon isSmall={isAboveMediumScreens} isDark={hasMounted && theme === 'dark'}/>} />
    </div>
</div>
  )
}
