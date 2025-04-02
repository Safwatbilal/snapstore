export type IProductForm = {
    productName: string;
    description: string;
    price: number;
    category: { categoryId: string;categoryName: string };
    imageUrl: string;
};

export type IProductUpdate = {
    id: string;
} & IProductForm;
