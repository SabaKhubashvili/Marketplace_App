import axios from "axios";
import { useQuery } from "react-query";

export default function getBookmarks(){
    return useQuery('bookmarks',async()=>{
        const response = await axios.get('/api/product/getBookmarkedProducts')

        return response.data
    })
}