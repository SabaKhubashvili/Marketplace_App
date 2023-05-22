import React, { useCallback, useState } from 'react'
import { Modal } from './Modal'
import { useLoginModal, useRegisterModal } from '@/hooks'
import { AuthInput } from '../Inputs/AuthInput'
import { FieldValues, useForm,SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'

export const RegisterModal = () => {
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
            username:'',
            email:'',
            password:''
        }
    })
    const handleChange = useCallback(()=>{
        loginModal.onOpen()
        registerModal.onClose()
    },[loginModal,registerModal])


    const onSubmit:SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios.post('/api/auth/register',data)
            .then(res=>{
                toast.success(res.data.message)    
                handleChange()
                
            }).catch(error=>{
                toast.error(error.response.data.message)                    
            }).finally(()=>{
                setIsLoading(false)
            })
    }

    let bodyContent = (
        <React.Fragment>
            <AuthInput id='username' label='Username' 
                register={register}
                errors={errors} 
                required
                disabled={isLoading}/>
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
            Already have accaunt? <span onClick={handleChange} className='cursor-pointer'>Click Here</span>
        </div>
    )
  return (
    <Modal
    
    title='Register'
    subTitle='Join our long journey'
    body={bodyContent}
    footer={footerContent}
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    showSubmit
    />
  )
}
