import { ProductSku } from "../entities";

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