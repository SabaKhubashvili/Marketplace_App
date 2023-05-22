import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from '@/Libs/prismadb'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: "Method not allowed" });
    }
    const session = await getServerSession(req,res,authOptions)
    const {
        userId
    } = req.body

    if(!session || !session.user){
        return res.status(501).json({message:'Unauthorized'})
    }
    if(!userId){
        return res.status(204).json({message:'All fields are required'})
    }
    try{
        const unfollow = await prisma.follow.deleteMany({
            where:{
                followerId:session.user.id,
                followingId:userId
            }
        })
        return res.status(200).json({message:'Sucesfully unfollowed'})
    }catch(error){   
        return res.status(500).json({message:'Something wrong happened'})
    }
    

}