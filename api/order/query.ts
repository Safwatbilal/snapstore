import { useMutation } from "@tanstack/react-query"
import { IOrderForm } from "./type"
import API from "./api"

const queries={
    addOrder:()=>
        useMutation({mutationFn:(body:IOrderForm)=>API.addOrder(body)})
    
}
export default queries