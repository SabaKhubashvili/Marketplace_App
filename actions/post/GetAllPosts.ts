import axios from "axios";
import { useQuery } from "react-query";


export default function getAllPosts(){
    return useQuery('post',async()=>{
        const response  = await axios.get('/api/post/getAll');
        
        return response.data
    })
}