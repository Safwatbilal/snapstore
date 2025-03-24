import { useMutation } from "@tanstack/react-query";
import API from "./api";

const queries={
    SignUp:()=>useMutation({mutationFn:API.signUp})
}
export default queries;