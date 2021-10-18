import { Product } from "../entities";
import { SkuDto } from "./sku.dto";

export class ProductResponse {
    id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    categoryId: string;
    views: number;
    status: string;
    discountPercent: number;
    salePrice: number;
    updatedAt: string;
    skus: SkuDto[];

    public static from(product: Product): ProductResponse {

        const {
            name,
            price,
            quantity,
            description,
            categoryId,
            image,
            views,
            status,
            discountPercent,
            skus
        } = product.props;

        return {
            id: product.id,
            name: name.value,
            price: price.value,
            quantity: quantity.value,
            description: description.value,
            categoryId: categoryId,
            views: views,
            status: status.value,
            discountPercent: discountPercent.value,
            salePrice: product.getSalePrice(),
            updatedAt: product.updatedAt,
            image: image,
            skus: skus.value.map(s => SkuDto.from(s))
        }
    }
}