import axios, { API_BASE_URL } from "@/lib/axios";
import { IOrderForm } from "./type";
import { IProductCart } from "../product/type";

const API={
    addOrder:async (body:IOrderForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/orders.json',body)
        return data
    },
    getAllOrderToUser: async (userId: string, filter?: string) => {
      const { data } = await axios.get(API_BASE_URL + '/orders.json');
      const myOrders: IOrderForm[] = Object.keys(data)
        .filter((key) => data[key].userId === userId)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .map((order) => {
          if (filter === "all") return order;
          const filteredCart = order.cartArray.filter((item: IProductCart) => item.state === filter);
          return {
            ...order,
            cartArray: filteredCart,
          };
        })
        .filter((order) => order.cartArray.length > 0); 
      return myOrders;
    },
    getAllOrdersToOwner: async (userId: string) => {
      const { data } = await axios.get(API_BASE_URL + '/orders.json');
      
      const myOrders: IOrderForm[] = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key]
        }))
        .map((order) => {
          const filteredCart = order.cartArray.filter((item: IProductCart) => item.userId === userId);
          return {
            ...order,
            cartArray: filteredCart,
          };
        })
        
      
      return myOrders;
    }
    
    
      
      
}
export default API