import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

const queries={
    getAllCategory:(userID:any)=>useQuery({queryKey:['category',userID],queryFn:()=>API.getAllCategory(userID)}),
    addCategory:()=>useMutation({mutationFn:API.addCategory})
}
export default queries;