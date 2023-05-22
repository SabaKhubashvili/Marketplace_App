import axios from "axios";
import { useQuery } from "react-query";

export default function getTags(){
    return useQuery('tags',async () =>{
        const response = await axios.get('/api/tag/getAll')
        return response.data
    })
}