import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

const queries={
    getAllCategory:(userID:any,search:string)=>useQuery({queryKey:['category',userID,search],queryFn:()=>API.getAllCategory(userID,search)}),
    addCategory:()=>useMutation({mutationFn:API.addCategory})
}
export default queries;