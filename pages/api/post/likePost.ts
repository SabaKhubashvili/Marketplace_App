import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/Libs/prismadb";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { postId } = req.body;
  const session = await getServerSession(req, res, authOptions) as Session;
  
  if (!session?.user?.email) {
    return res.status(501).json({ message: "Unauthorized" });
  }
  
  const authorizedUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select:{
        id:true
      }
    });
    
    if (!authorizedUser) {
      return res.status(501).json({ message: "Unauthorized" });
  }
  
  const isLiked = await prisma.likes.count({
    where: {
      postId,
      userId: authorizedUser.id,
    },
  });

  if (isLiked === 0) {
    const like = await prisma.likes.create({
      data: {
        postId,
        userId: authorizedUser.id,
      },
    });
    return res.status(201).json({ message: 'Successfully liked', liked: true });

  }

  const unlike = await prisma.likes.deleteMany({
    where: {
      postId,
      userId: authorizedUser.id,
    },
  });

  return res.status(204).json({ message: 'Successfully unliked', liked: false });

}
