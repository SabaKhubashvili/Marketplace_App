import { AnimatePresence,motion } from 'framer-motion'
import React,{useState} from 'react'
import { CommentComponent } from './CommentComponent'
import { AuthInput } from '../Inputs/AuthInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { MainButton } from '../Buttons/MainButton'
import axios from 'axios'
import { CommentsInterface } from '@/types'
import { toast } from 'react-hot-toast'

interface Props{
    productId:string
    showComments?:boolean,
    Comments:CommentsInterface[],
    isFeed?:boolean
    isBig?:boolean
}

export const CommentsSection = ({showComments,productId,Comments,isFeed,isBig}:Props) => {
    const [isLoading,setIsLoading] = useState<boolean>()
    const [shownCommentsLength,setShownCommentsLength] = useState<number>(3)
    const slicedComment = Comments.slice(0,shownCommentsLength)
    const {
        register,
        handleSubmit,
        formState:{
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            comment:''
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post(`api/${isFeed ? 'post/createComment' : 'product/createComment'}`,{...data,id:productId})
            .then(res=>{
                Comments.unshift(res.data.comment)
                reset()
            }).catch(error=>{
                toast.error(error.response.data.message)      
            }).finally(()=>{
                setIsLoading(false)
            })
        
    }

  return (
    <AnimatePresence>
        {
            showComments &&
            <motion.div
                initial={{opacity:0}}
                animate={{opacity:100}}
                exit={{opacity:0}}
                transition={{duration:0.3}}
                className='flex flex-col gap-[24px]'
            >
               {
                slicedComment.map((comment:CommentsInterface,index:number)=>(
                    <CommentComponent key={comment.id} index={index} comment={comment.comment} publisher={comment.author} />
                ))
               }
                  { slicedComment.length < Comments.length &&

                    <div className='text-center text-2xl text-main font-semibold cursor-pointer' onClick={()=>{setShownCommentsLength(prev=>prev+3)}}>
                      Explore More
                      
                    </div>
                } 

                <div className='flex items-center gap-[10px] justify-between xs:flex-row flex-col'>
                    <div className={`2xl:basis-3/5 basis-7/12 ${isBig && 'flex-grow' }  `}>

                    <AuthInput 
                    id='comment'
                    register={register} 
                    errors={errors} 
                    label='Enter Comment' 
                    required
                    disabled={isLoading} />
                    </div>
                    <div className='2xl:basis-1/5' onClick={handleSubmit(onSubmit)}>
                        <MainButton label='Comment' disabled={isLoading} isFull/>
                    </div>
                </div>

            </motion.div>
        }
    </AnimatePresence>
  )
}
