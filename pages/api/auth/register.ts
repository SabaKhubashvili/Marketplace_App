import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prisma from '@/Libs/prismadb'


export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    if(req.method !== 'POST'){
        return res.status(405).json({message:'Invalid request method'})
    }
    const{
        username,
        email,
        password
    } = req.body

    if(!username || !email || !password){
        return res.status(400).json({message:'Not enough data'})
    }

    const isRegistered = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(isRegistered){
        return res.status(409).json({message:'Email is already registered'})
    }

    const hashedPassword = await bcrypt.hash(password,12) 
    
   try{
    const user = await prisma.user.create({
        data:{
            name:username,
            email,
            hashedPassword,
        }
    })
    return res.status(200).json({message:'Succesfully Registered'})
   }catch(error){
    return res.status(500).json({message:'Something wrong happened'})
   }


}