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

   
    if(!session || !session.user || !session.user.id){
        return res.status(501).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
        where:{
            id: session.user.id
        },
        select:{
            canPostProduct:true
        }
    })

    if(!user || !user.canPostProduct){
        return res.status(403).json({message:"You can't post here ask admin for permission"})
    }

    
    const{
        title,
        description,
        image,
        tags
    } = req.body

    if(!description || !image || !title){
        return res.status(204).json({message:'All fields are required'})
    }
    try{

        const productCreate = await prisma.product.create({
            data:{
            title,
            description,
            image,            
            userId:session.user.id
        }
    })

    const productTagsData = tags.map((tag:string) => ({
        productId: productCreate.id,
        tagId: tag
      }));

      await prisma.productTags.createMany({
        data: productTagsData
      });
  

    return res.status(200).json({message:'Succesfully Created Product'})
}catch(error){

    return res.status(500).json({message:'Something wrong happened'})
}


   
}