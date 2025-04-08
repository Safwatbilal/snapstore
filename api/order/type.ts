import { IProductCart } from "../product/type";

export type IOrderForm = {

    id: string;
    userId: string;

    cartArray:IProductCart[],
    
};
