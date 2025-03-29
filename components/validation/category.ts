import { object } from "yup";
import { stringValidation } from "./valdation";
import { ICategoryForm } from "@/api/category/type";
export type ICategoryAction={
    categoryName:string;
    url:string;
}
export const defaultCategoryAction={
    categoryName:"",
    url:""
}
export const categotyValidation=()=>
    object().shape({
        categoryName: stringValidation(),
        url: stringValidation(),
    })

export const categoryValue=(data:ICategoryForm)=>{
    if(data){
        return{
            categoryName:data.categoryName,
            url:data.url
        }
    }
}