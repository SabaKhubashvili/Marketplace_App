import axios from "axios";
import { useQuery } from "react-query";

export default function getAllUser(){
    return useQuery('users',async()=>{
        const resposne = await axios.get('api/user/getAll')
        return resposne.data
    })
}