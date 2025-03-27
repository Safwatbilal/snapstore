import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/axios";
import { ICategoryForm } from "./type";
const API={
    getAllCategory:async (userId: any,search:string)=>{
        const { data } = await axios<ICategoryForm>(API_BASE_URL+'/category.json')
        if (!data) return [];
            const categories:ICategoryForm[] = Object.keys(data)
                .filter(key => data[key].userId === userId) 
                .map(key => ({
                    id: key,
                    ...data[key],
                }))
                .filter(category => 
                    category.categoryName.toLowerCase().includes(search.toLowerCase())
                );
            return categories;
    
    },
    addCategory:async(body:ICategoryForm)=>{
        const{data}=await axios.post(API_BASE_URL+'/category.json',body)
        return data;
    }
}
export default API