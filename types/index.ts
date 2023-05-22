import {  Bookmark, Follow, Likes, Product, Tag, User, productLikes } from "@prisma/client"
import {DefaultSession} from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

export interface PostInterface{
    id:string
    title:string
    description:string,
    image:string
    
    createdAt:Date
    updatedAt:Date

    userId:string,
    publisher:User

    Likes:Likes[]
    PostComments:CommentsInterface[]

}

export interface ProductInterface extends Product{
    publisher:UserInterface

    productLikes:productLikes[]
    comments:CommentsInterface[]
    tags:Tag[]
    bookmarkedBy:Bookmark[]
}

export interface CommentsInterface{
  id: string
  comment: string
  productId?: string
  userId?: string
  createdAt?: Date
  updatedAt?: Date

  author:User
}
export interface UserInterface extends User{
  Follower:Follow[]
  Following:Follow[]
}