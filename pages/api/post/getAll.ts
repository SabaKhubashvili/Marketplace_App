import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET' ){
        return res.status(405).json({ message: "Method not allowed" });
    }
    
    try{

        const posts = await prisma.post.findMany({
            orderBy:{
                createdAt:'desc'
            },
            include:{
                Likes:{
                    select:{
                        id:true,
                        userId:true,
                        postId:true
                    }
                },
                publisher:{
                    select: {
                        id: true,
                        name: true,
                        email: true,
                      },
                },
                PostComments:{
                    select:{
                        id:true,
                        author:{
                            select:{
                                name:true,
                                image:true,
                                isVerified:true
                            }
                        },
                        comment:true
                    }
                },
                
                
                
            }
        })


        return res.status(200).json(posts)
    }
    catch(error){
        return res.status(500).json({message:"Something wrong happened"})
    }
}