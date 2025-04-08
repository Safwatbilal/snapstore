import { useMutation, useQuery } from "@tanstack/react-query"
import { IOrderForm } from "./type"
import API from "./api"

const queries={
    addOrder:()=>
        useMutation({mutationFn:(body:IOrderForm)=>API.addOrder(body)}),
    getAllOrderToUser:(userId:string,filter?:string)=>
        useQuery({queryKey:['orders',userId,filter],queryFn:()=>API.getAllOrderToUser(userId,filter)}),
    getAllOrdersToOwner:(userId:string,state:string)=>
        useQuery({queryKey:['orders',userId,state],queryFn:()=>API.getAllOrdersToOwner(userId,state)}),
    changeStateOrder: () =>
        useMutation({
            mutationFn: ({ id,productId ,state }: { id: string;productId:string; state: string }) =>
            API.changeStateOrder(id,productId ,state),
        }),
    
}
export default queries