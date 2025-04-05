import { IProductCart } from "../product/type";

export type IOrderForm = {
    address: string;
    moreinformation: string;
    id: string;
    userId: string;
    timeOrder: string;
    cartArray:IProductCart[],
    
};
