import { object } from "yup";
import { stringValidation } from "./valdation";
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