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
    const session =  await getServerSession(req,res,authOptions)

    try{
        const users = await prisma.user.findMany({
            where:{
                NOT:{
                    id:session?.user.id
                }
            }
            ,
            orderBy:{
                createdAt:'desc'
            },
            include:{
                Follower:true,
                Following:true
            }
            
        })

        return res.status(200).json(users)
    }catch(error){
        return res.status(500).json({message:'Something went wrong'})
    }
}