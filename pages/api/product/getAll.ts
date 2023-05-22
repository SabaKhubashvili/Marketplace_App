import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/Libs/prismadb'

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'GET'){
        return res.status(405).json({ message: "Method not allowed" });
    }
    


        const products = await prisma.product.findMany({
            orderBy:{
                createdAt:'desc'
            },
            include:{
                publisher:{
                    select:{
                        id:true,
                        name:true,
                        image:true,
                        isVerified:true,
                        Follower:true
                    }
                },
                productLikes:{
                    select:{
                        id:true,
                        userId:true
                    }
            },
            comments:{
                select:{
                    id:true,
                    comment:true,
                    author:{
                        select:{
                            name:true,
                            image:true,
                            isVerified:true
                        }
                    }
                },
                orderBy:{
                    createdAt:'desc'
                }
            },
            tags:{
                select:{
                    tag:{
                        select:{
                            id:true,
                            name:true
                        }
                    }
                }
            },
            bookmarkedBy:{
                select:{
                    userId:true
                }
            }
            
        }
    })

    return res.status(200).json(products)

}