import axios from '@/lib/axios';
import { API_BASE_URL } from '@/lib/axios';
import { ILoginForm, ISignUpForm } from './type';
const API={
    signUp:async (body:ISignUpForm)=>{
        const {data}=await axios.post(API_BASE_URL+`/users.json`,body)
        return data;
    },
    getUser:async(userId:string)=>{
        const {data}=await axios.get<ISignUpForm>(API_BASE_URL+`/users/${userId}.json`,)
        return data
    },
    
    getAllUsers: async (userId?: string) => {
        const { data } = await axios.get<Record<string, ISignUpForm>>(`${API_BASE_URL}/users.json`);
        
        if (!data) return [];
    
        const users = Object.entries(data)
            .map(([id, user]) => ({
                ...user,
                id,  // إضافة id كخاصية للمستخدم
            }));
    
        // تصفية المستخدمين بناءً على userId إذا تم تمريره
        return userId ? users.filter(user => user.id === userId) : users;
    },
    
    
}
export default API;