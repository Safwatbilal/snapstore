import axios, { API_BASE_URL } from "@/lib/axios";
import { IProductForm } from "./type";

const API={
    getAllProducts: async (userId: string, search?: string) => {
            const { data } = await axios.get<Record<string, IProductForm>>(`${API_BASE_URL}/products.json`);
    
            if (!data) return [];

            if (userId === '0') {
                return Object.entries(data).map(([id, product]) => ({ ...product, id }))   .filter(product => !search || product.productName.toLowerCase().includes(search.toLowerCase()));
            }

            return Object.entries(data)
                .filter(([_, product]) => product.userId === userId)
                .map(([id, product]) => ({ ...product, id }))
                .filter(product => !search || product.productName.toLowerCase().includes(search.toLowerCase()));
    },
    addProduct:async(body:IProductForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/products.json',body)
        return data
    },
    updateProduct:async (id:string,body:IProductForm)=>{
        const { data } = await axios.put<IProductForm>(`${API_BASE_URL}/products/${id}.json`, body);
        return data;
    },
    getProduct:async(id:string)=>{
        const {data}=await axios.get<IProductForm>(`${API_BASE_URL}/products/${id}.json`,)
        return data
    }
}
export default API;