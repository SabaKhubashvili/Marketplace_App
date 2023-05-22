import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: "Method not allowed" });
    }

    const{
        productId
    } = req.body

    if(!productId){
        return res.status(404).json({message:'Product not found'})
    }
    try{

        const product = await prisma.product.findUnique({
            where:{
                id:productId
            },
            include:{
                publisher:true,
                comments:true,
                productLikes:true,
                tags:{
                    select:{
                        tag:true
                    }
                }
            }
        })
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:"Something wrong happened"})
    }


}