export type IProductForm = {
    productName: string;
    description: string;
    price: number;
    category: { categoryId: string;categoryName: string };
    imageUrl: string[];
    userId:string
    id:string,
    completed:number
    
};
export type IProductCart={
    state:string
    quantity:number
    timeOrder:string
    productId:string
    address: string;
    moreinformation: string;
}&IProductForm

export type IProductUpdate = {
    id: string;
} & IProductForm;
