import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/axios";
import { ICategoryForm, ICategoryUpdate } from "./type";
import { string } from "yup";
const API={
    getAllCategory: async (userId: any, search?: string) => {
        const { data } = await axios.get<Record<string, ICategoryForm>>(API_BASE_URL + "/category.json");
        
        if (!data) return [];
        
        const categories: ICategoryForm[] = Object.keys(data)
            .filter(key => data[key].userId === userId)
            .map(key => ({
                ...data[key],
                id: key,
            }))
            .filter(category =>
                search ? category.categoryName.toLowerCase().includes(search.toLowerCase()) : true
            ); 
    
        return categories;
    },
    updateCategory: async (id: string, body: ICategoryForm) => {
        const { data } = await axios.put<ICategoryUpdate>(`${API_BASE_URL}/category/${id}.json`, body);
        return data;
    },
    getCategory:async(id:string)=>{
        const { data } = await axios.get<ICategoryForm>(API_BASE_URL +  `/category/${id}.json`,);
        return data;
    },
    addCategory:async(body:ICategoryForm)=>{
        const{data}=await axios.post(API_BASE_URL+'/category.json',body)
        return data;
    }
}
export default API