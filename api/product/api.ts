import { useMutation } from "@tanstack/react-query"
import API from "./query"
import { useQuery } from "@tanstack/react-query"
const queries={
        getAllProducts:(userID:any,search?:string)=>useQuery({queryKey:['category',userID,search],queryFn:()=>API.getAllProducts(userID,search)}),
        addProduct:()=>useMutation({mutationFn:API.addProduct})
}
export default queries