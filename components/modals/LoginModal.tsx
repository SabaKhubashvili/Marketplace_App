import React, { useCallback, useState } from 'react'
import { Modal } from './Modal'
import { useLoginModal, useRegisterModal } from '@/hooks'
import { AuthInput } from '../Inputs/AuthInput'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

export const LoginModal = () => {
    const router = useRouter()
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    
    const{
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })
    const handleChange = useCallback(()=>{
        loginModal.onClose()
        registerModal.onOpen()
    },[loginModal,registerModal])

    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        signIn('credentials',{
            ...data,
            redirect:false
        }).then((callback)=>{
            setIsLoading(false)
            if(callback?.ok){
                toast.success('Successfully logged in')
                loginModal.onClose()
                router.reload()
            }else if(callback?.error){
                toast.error(callback?.error)
            }
        })
    
    }

    let bodyContent = (
        <React.Fragment>
            <AuthInput id='email' label='Email' 
                register={register}
                errors={errors} 
                required
                disabled={isLoading}
                type='email'/>
            <AuthInput id='password' label='Password' 
                register={register}
                errors={errors} 
                required
                disabled={isLoading}
                type='password'
                />
        </React.Fragment>
    )
    let footerContent = (
        <div className='w-full dark:text-white text-secondary'>
            Dont't have accaunt? <span className='cursor-pointer' onClick={handleChange}>Click Here</span>
        </div>
    )
  return (
    <Modal
    
    title='Login'
    subTitle='Welcome back!'
    body={bodyContent}
    footer={footerContent}
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    showSubmit
    />
  )
}
