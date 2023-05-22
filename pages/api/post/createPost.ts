import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({ message: "Method not allowed" });
    }
    
    const session = await getServerSession(req, res, authOptions)

   
    if(!session || !session.user || !session.user.email){
        return res.status(501).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!user){
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const{
        title,
        description,
        image
    } = req.body

    if(!description || !image || !title){
        return res.status(204).json({message:'All fields are required'})
    }
    try{

        const post = await prisma.post.create({
            data:{
            title,
            description,
            image,
            
            userId:user.id
        }
    })
    return res.status(200).json({message:'Succesfully Created Post'})
}catch(error){
    return res.status(500).json({message:'Something wrong happened'})
}

   
}