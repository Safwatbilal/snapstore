import axios, { API_BASE_URL } from "@/lib/axios";
import { IOrderForm } from "./type";

const API={
    addOrder:async (body:IOrderForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/orders.json',body)
        return data
    }
}
export default API