import { ProductSku } from "../domains";

export class SkuDto {

    id?: string;
    createdAt?: string;
    updatedAt?: string;
    image: string;
    description: string;
 
    public static from(sku: ProductSku): SkuDto {
        return {
            id: sku.id,
            image: sku.props.image,
            description: sku.props.description.value,
            createdAt: sku.createdAt,
            updatedAt: sku.updatedAt
        }
    }
}