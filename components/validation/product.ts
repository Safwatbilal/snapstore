import { object } from "yup";
import { stringValidation } from "./valdation";
import { IProductForm } from "@/api/product/type";
import * as Yup from "yup";

export type IProductAction = {
    productName: string;
    description: string;
    price: number;
    category: { categoryId: string; categoryName: string };
    imageUrl: string[];
};

export const defaultProductAction: IProductAction = {
    productName: "",
    description: "",
    price: 0,
    category: { categoryId: "", categoryName: "" },
    imageUrl: [],
};

export const productValidation = () =>
    object().shape({
        productName: stringValidation(),
        description: stringValidation(),
        price: Yup.number().positive().required("Price is required"),
        category: Yup.object().shape({
            categoryId: stringValidation(),
        }), 

    });

export const productValue = (data: IProductForm) => {
    if (data) {
        return {
            productName: data.productName,
            description: data.description,
            price: data.price,
            category: {
                categoryId: data.category?.categoryId||'',
                categoryName: data.category?.categoryName||'',
            },
            imageUrl: data.imageUrl,
        };
    }
    return defaultProductAction; 
};
