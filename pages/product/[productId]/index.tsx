import Head from 'next/head'
import React from 'react'
import { ProductInterface } from '@/types'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { VerifiedIcon } from '@/public/Svg/Icons'
import { CommentsSection } from '@/components/Comments/Comments'

const index = ({
    id,
    title,
    description,
    image,
    publisher,
    comments,
    tags
}:ProductInterface) => {


  return (
    <React.Fragment>

        <Head>
            <title>Product: {title}</title>
            <meta property='og:title'  content={title}/>
            <meta property='og:description'  content={description}/>
            <meta property='og:image' content={image} />
        </Head>
        <main className='w-full md:px-[23px] px-[10px] pt-[44px]'>
            <h1 className='text-[32px]  font-semibold text-[#2A2A2A] dark:text-[#FFF]'>Product</h1>

            <div className='pt-[100px] flex   lg:flex-row flex-col justify-between gap-[50px] h-[80%] overflow-y-auto'>
                <div className="basis-1/2 w-full max-h-[40rem]" >
                        <Image
                            src={image}
                            alt='PRODUCTIMAGE'
                            width={400}
                            height={400}
                            className='w-full h-full object-cover'
                        />
                </div>
                <div className="basis-1/2 flex flex-col gap-[20px]" >
                    <h1 className='font-bold text-4xl'>{title}</h1>
                    <p className='flex items-center gap-[10px]  '>
                        {publisher.image ?
                            <img src={publisher.image} className='cursor-pointer rounded-full' alt="" />
                            :
                            <img src="/Images/User/DefaultImage.webp" className='cursor-pointer rounded-full w-12 border-[1px] border-solid border-main' alt=""  />
                        }
                        {publisher.name}
                        {
                            publisher.isVerified
                            &&
                            <VerifiedIcon/>
                        }
                    </p>
                    <ul className='flex gap-[10px]'>
                        {
                            tags.map((singletag:any)=>(
                                <li className='text-secondary' key={singletag.tag.id}>
                                {singletag.tag.name},
                             </li>   
                            ))
                        }
                        </ul>
                    <p className='text-neutral-400'>
                        {description}
                    </p>
                </div>
               
            </div>
            <div className='pt-[30px] w-full'>
                <CommentsSection isBig showComments productId={id} Comments={comments}/>
            </div>
        </main>

    </React.Fragment>
  )
}



export const getServerSideProps = async(ctx:GetServerSidePropsContext) => {
    const host = ctx.req.headers.host;

    const {productId} = ctx.params as {productId:string}
    
    
    let product = {}

    try{
        const fetch = await axios.post<ProductInterface>(`http://${host}/api/product/getById`,{productId})
        product = fetch.data
        
   
    }catch(error:any){        
        return{
            props:{}
        }
    }
    
    return{
        props:{
            ...product,
        }
    }
}

export default index