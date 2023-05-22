import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '@/Libs/prismadb'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({maessage:'Method not allowed'})
    }

    const{
         productId
    } = req.body

    if(!productId){
        return res.status(404).json({message:'Product not found'})
    }
    const session =  await getServerSession(req,res,authOptions)

    if(!session || !session.user.id){
        return res.status(501).json({message:'Unauthorized'})
    }
    
    const isLiked = await prisma.productLikes.count({
        where:{
            productId,
            userId:session.user.id
        }
    })
    if(isLiked === 0){
        const like = await prisma.productLikes.create({
            data:{
                productId,
                userId:session.user.id
            }
        })
        return res.status(201).json({ message: 'Successfully liked', liked: true });
    }else{
        const unlike = await prisma.productLikes.deleteMany({
            where:{
                productId,
                userId:session.user.id
            }
        })
        return res.status(200).json({ message: 'Successfully unliked', liked: false });
    }
}