import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET'){
        return res.status(405).json({ message: "Method not allowed" });
    }
    const session = await getServerSession(req,res,authOptions)
    try{
        const product = await prisma.bookmark.findMany({
            where:{
                userId:session?.user.id
            },
            select:{
                product:{
                    include:{
                        productLikes:true,
                        bookmarkedBy:true,
                        comments:true,
                        tags:{
                            select:{
                                tag:true
                            }
                        },
                        publisher:true
                    }
                }
            }
        })
        return res.status(200).json(product)
    }catch(error){
        return res.status(500).json({message:'Something went wrong'})
    }
}