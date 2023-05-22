import axios from "axios";
import { useQuery } from "react-query";

export default function getTrendingProducts(){
    return useQuery('trendingProducts',async()=>{
        const response = await axios.get('/api/product/getTrendingProducts')

        return response.data
    })
}