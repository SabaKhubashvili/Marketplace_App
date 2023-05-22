import axios from "axios";
import { useQuery } from "react-query";

export default function getAllProducts(){
    return useQuery('product',async ()=>{
        const response = await axios.get('/api/product/getAll')
        return response.data
    })
}