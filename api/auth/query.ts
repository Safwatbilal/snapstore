import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./api";

const queries={
    SignUp:()=>useMutation({mutationFn:API.signUp}),
    getAllUsers:(userId:string)=>
        useQuery({
            queryKey:['users',userId],
            queryFn:()=>API.getAllUsers(userId)}),
    getUser:(userId:string)=>useQuery({queryKey:['users',userId],queryFn:()=>API.getUser(userId)})
}
export default queries;