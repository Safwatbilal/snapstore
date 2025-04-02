import { useMutation } from "@tanstack/react-query"
import API from "./api"
import { useQuery } from "@tanstack/react-query"
import { IProductForm } from "./type"
const queries={
        getAllProducts:(userID?:any,search?:string)=>useQuery({queryKey:['products',userID,search],queryFn:()=>API.getAllProducts(userID,search)}),
        ProductsActions:(id?:string)=>useMutation({mutationFn:(body:IProductForm)=> id?API.updateProduct(id,body):API.addProduct(body)}),
        getProduct:(id:string)=>useQuery({queryKey:['products',id],queryFn:()=>API.getProduct(id)})
}
export default queries