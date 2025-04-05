import axios, { API_BASE_URL } from "@/lib/axios";
import { IOrderForm } from "./type";

const API={
    addOrder:async (body:IOrderForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/orders.json',body)
        return data
    },
    getAllOrderToUser:async(userId:string)=>{
        const {data}=await axios.get(API_BASE_URL+'/orders.json')
        const myOrders:IOrderForm[]=Object.keys(data)
        .filter(key=>data[key].userId===userId)
        .map(key=>({
            id:key,
            ...data[key]
        }))
        return myOrders
    }
}
export default API