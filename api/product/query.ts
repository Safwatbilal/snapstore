import axios, { API_BASE_URL } from "@/lib/axios";
import { IProductForm } from "./type";

const API={
    getAllProducts: async (userId: any, search?: string) => {
        const { data } = await axios.get<IProductForm>(API_BASE_URL + "/products.json");
        
        if (!data) return [];
        
        const products: IProductForm[] = Object.keys(data)
            .filter(key => data[key].userId === userId)
            .map(key => ({
                id: key,
                ...data[key],
            }))
            .filter(product =>
                search ? product.productName.toLowerCase().includes(search.toLowerCase()) : true
            ); 
    
        return products;
    },
    addProduct:async(body:IProductForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/products.json',body)
        return data
    }
}
export default API;