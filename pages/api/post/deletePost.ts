import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: "Method not allowed" });
    }

    const{
        postId
    } = req.body
    
    const session = await getServerSession(req,res,authOptions)

    if(!session || !session.user || !session.user.email){
        return res.status(501).json({ message: 'Unauthorized' });
    }


    const authorizedUser = await prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!authorizedUser){
        return res.status(501).json({ message: 'Unauthorized' });
    }
    const post = await prisma.post.deleteMany({
        where:{
            id:postId,
            userId:authorizedUser.id
        }
    })

    if(!post){
        return res.status(404).json({message:'Post not found'})
    }

    return res.status(200).json({message:'Sucesfully deleted'})
    
   

    
}