import { SkuDto } from "./sku.dto";


export class CreateProductDto {
    name: string;
    image: string;
    price: number;
    categoryId: string;
    quantity: number;
    description: string;
    discountPercent?:number;
    skus?: SkuDto[];
}