import { useMutation, useQuery } from "@tanstack/react-query"
import { IOrderForm } from "./type"
import API from "./api"

const queries={
    addOrder:()=>
        useMutation({mutationFn:(body:IOrderForm)=>API.addOrder(body)}),
    getAllOrderToUser:(userId:string)=>
        useQuery({queryKey:['orders',userId],queryFn:()=>API.getAllOrderToUser(userId)})
    
}
export default queries