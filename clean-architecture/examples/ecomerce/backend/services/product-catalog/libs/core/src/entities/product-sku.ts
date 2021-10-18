import { Entity, GuardArgumentCollection, GuardUtil, Result } from "company-core";
import { ProductDescription } from "./product-description";

export interface ProductSkuProps {
    image: string;
    description: ProductDescription;
}

export class ProductSku extends Entity<ProductSkuProps>{

    public static create(props: ProductSkuProps, id?: string): Result<ProductSku> {

        const guardCollections: GuardArgumentCollection = [
            {
                argument: props.description,
                argumentName: 'SKU description'
            },
            {
                argument: props.image,
                argumentName: 'SKU image'
            }
        ];
        
        const result = GuardUtil.againstNullOrUndefinedBulk(guardCollections);
        if (!result.succeeded) {
            return Result.fail(result.message);
        }

        return Result.ok(new ProductSku(props, id));
    }
}