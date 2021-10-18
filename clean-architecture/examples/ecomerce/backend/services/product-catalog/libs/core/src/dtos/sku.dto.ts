import { ProductSku } from "../domains";

export class SkuDto {
    image: string;
    description: string;

    public static from(sku: ProductSku): SkuDto {
        return {
            image: sku.props.image,
            description: sku.props.description.value
        }
    }
}