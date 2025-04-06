import { useMutation, useQuery } from "@tanstack/react-query"
import { IOrderForm } from "./type"
import API from "./api"

const queries={
    addOrder:()=>
        useMutation({mutationFn:(body:IOrderForm)=>API.addOrder(body)}),
    getAllOrderToUser:(userId:string,filter?:string)=>
        useQuery({queryKey:['orders',userId,filter],queryFn:()=>API.getAllOrderToUser(userId,filter)}),
    getAllOrdersToOwner:(userId:string)=>
        useQuery({queryKey:['orders',userId],queryFn:()=>API.getAllOrdersToOwner(userId)})
    
}
export default queries