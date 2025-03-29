import { object } from "yup";
import { stringValidation } from "./valdation";

export type IProductAction={
    productName:string;
    description:string;
    price:number;
    category:string;
    imageUrl:string;
}
export const defaultProductAction={
    productName:"",
    description:"",
    price:"",
    category:"",
    imageUrl:"",
}
export const productValidation=()=>{
    object().shape({
        productName:stringValidation(),
        description:stringValidation(),
        price:stringValidation(),
        category:stringValidation(),
        imageUrl:stringValidation(),
    })
}
