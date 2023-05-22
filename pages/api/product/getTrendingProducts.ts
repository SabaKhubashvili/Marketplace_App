import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET'){
        return res.status(405).json({ message: "Method not allowed" });
    }
    
    try{
        const products = await prisma.product.findMany({
            orderBy:{
                productLikes:{
                    _count:'desc'
                }
            },
            select:{
                id:true,
                title:true,
                image:true,
                publisher:{
                   select:{
                    name:true,
                    Follower:true
                   }
                },
                createdAt:true
            },
            take:7
        })
        return res.status(200).json(products)
    }catch(error){
        return res.status(500).json({message:'Something wrong happened'})
    }

}