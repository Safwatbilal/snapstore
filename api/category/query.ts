import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";
import { ICategoryForm } from "./type";
const queries={
    getCategory:(id:string)=>
        useQuery({
            queryKey:['category',id],
            queryFn:()=>API.getCategory(id)
        }),
    getAllCategory:(userID:any,search?:string)=>
        useQuery({
            queryKey:['category',userID,search],
            queryFn:()=>API.getAllCategory(userID,search)
        }),  
        CategoryActions :(id?: string) => 
            useMutation({
                mutationFn: (body: ICategoryForm) => 
                    id ? API.updateCategory(id, body) : API.addCategory(body)
            })
    }
export default queries;