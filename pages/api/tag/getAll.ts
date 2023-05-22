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
        const tags = await prisma.tag.findMany({
            orderBy:{
                name:'desc'
            },
            
        })

        return res.status(200).json(tags)
    }catch(error){
        return res.status(500).json({message:'Something went wrong'})
    }
}