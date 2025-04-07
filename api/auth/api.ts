import axios from '@/lib/axios';
import { API_BASE_URL } from '@/lib/axios';
import { ILoginForm, ISignUpForm } from './type';
const API={
    signUp:async (body:ISignUpForm)=>{
        const {data}=await axios.post(API_BASE_URL+`/users.json`,body)
        return data;
    },
    getUser:async(userId:string)=>{
        const {data}=await axios.get<ISignUpForm>(API_BASE_URL+`/users.json`,)
        return data
    },
    getAllUsers: async (userId?: string): Promise<ISignUpForm[]> => {
        const { data } = await axios.get<Record<string, ISignUpForm>>(`${API_BASE_URL}/users.json`);
      
        if (!data) return [];
      
        const users = Object.entries(data).map(([id, user]) => ({
          ...user,
          id,
        }));
      
        return userId ? users.filter(user => user.token === userId) : [];
      }
      
    
}
export default API;