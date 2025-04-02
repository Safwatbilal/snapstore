import { useMutation, useQuery } from "@tanstack/react-query";
import { ICommentForm } from "./type";
import API from "./api";

const queries={
    addComment:()=>
        useMutation({mutationFn:(body:ICommentForm)=>API.addComment(body)}),
    getAllcomments:(id:string)=>
        useQuery({queryKey:['comments',id],queryFn:()=>API.getAllComment(id)})
}
export default queries;