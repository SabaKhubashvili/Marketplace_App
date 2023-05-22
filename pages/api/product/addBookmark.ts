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

    const{
        productId
    } = req.body

    if(!productId){
        return res.status(404).json({message:'Product not found'})
    }
    const session = await getServerSession(req,res,authOptions)

    if(!session || !session.user){
        return res.status(501).json({message:'Unauthorized'})
    }

    try{

        const addBookmark = await prisma.bookmark.create({
            data:{
                userId:session.user.id,
                productId
            }
        })
        return res.status(200).json({message:'Sucesfully bookmarked'})
    }catch(error){
        return res.status(500).json({message:"Something wrong happened"})
    }
}