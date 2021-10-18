import { ProductSku } from "./product-sku";

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    discountPercent: string;
    skus: ProductSku[];
    createdAt: string;
    updatedAt: string;
    salePrice?: string;
}