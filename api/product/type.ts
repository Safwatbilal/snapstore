export type IProductForm = {
    productName: string;
    description: string;
    price: number;
    category: { categoryId: string;categoryName: string };
    imageUrl: string;
    userId:string
    id:string
};

export type IProductUpdate = {
    id: string;
} & IProductForm;
