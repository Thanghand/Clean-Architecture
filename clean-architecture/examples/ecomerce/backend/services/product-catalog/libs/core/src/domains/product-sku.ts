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

    updateSku(sku: ProductSku): Result<void> {

        const result = GuardUtil.againstNullOrUndefined(sku, 'Product Sku');
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        if (sku.id !== this.id) {
            return Result.fail('The updated Sku was not matched');
        }
        this.props.image = sku.props.image;
        this.props.description = sku.props.description;

        super.update();
        return Result.ok();
    }
}