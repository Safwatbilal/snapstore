import axios from '@/lib/axios';
import { API_BASE_URL } from '@/lib/axios';
import { ILoginForm, ISignUpForm } from './type';
const API={
    signUp:async (body:ISignUpForm)=>{
        const {data}=await axios.post(API_BASE_URL+'/users.json',body)
        return data;
    }
}
export default API;