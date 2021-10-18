import { Entity, GuardArgumentCollection, GuardUtil, Result } from "company-core";
import { ProductName } from "./product-name";
import { ProductPrice } from "./product-price";
import { DiscountPercent } from "./discount-percent";
import { ProductQuantity } from "./product-quantity";
import { ProductStatus } from "./product-status";
import { ProductSku } from "./product-sku";
import { ProductDescription } from "./product-description";
import { ProductSkus } from "./product-skus";

export interface ProductProps {
    name: ProductName;
    price: ProductPrice;
    quantity: ProductQuantity;
    description: ProductDescription;
    image: string;
    categoryId: string;
    
    // Optionals
    views?: number;
    skus?: ProductSkus;
    status?: ProductStatus;
    discountPercent?: DiscountPercent;
}

export class Product extends Entity<ProductProps> {

    public static create(props: ProductProps, id?: string): Result<Product> {

        const guardCollections: GuardArgumentCollection = [
            {
                argument: props.name,
                argumentName: 'Product Name'
            },
            {
                argument: props.image,
                argumentName: 'Product Image'
            },
            {
                argument: props.price,
                argumentName: 'Product Price'
            },
            {
                argument: props.categoryId,
                argumentName: 'Product CategoryId'
            },
            {
                argument: props.quantity,
                argumentName: 'Product Quantity'
            },
            {
                argument: props.description,
                argumentName: 'Product Description'
            }
        ];

        const validationResult = GuardUtil.againstNullOrUndefinedBulk(guardCollections);
        if (!validationResult.succeeded) {
            return Result.fail(validationResult.message);
        }

        const defaultProps: ProductProps = {
            ...props,
            views: props.views ?? 0,
            skus: props.skus ?? ProductSkus.create([]).getValue(),
            status: props.status ?? ProductStatus.WAITING_FOR_APPROVE,
            discountPercent: props.discountPercent ?? DiscountPercent.create(0).getValue()
        }
        return Result.ok(new Product(defaultProps, id));
    }

    public rename(name: ProductName): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(name, "Product Name");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        this.props.name = name;
        super.update();
        return Result.ok();
    }

    public updatePrice(price: ProductPrice): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(price, "Product Price");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        this.props.price = price;
        super.update();
        return Result.ok();
    }

    public updateDiscountPercent(discountPercent: DiscountPercent): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(discountPercent, "Product Discount Percent");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        this.props.discountPercent = discountPercent;
        super.update();
        return Result.ok();
    }

    public updateQuantity(quantity: ProductQuantity): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(quantity, "Product quantity");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        this.props.quantity = quantity;
        super.update();
        return Result.ok();
    }

    public increaseView(): Result<void> {
        this.props.views += 1;
        super.update();
        return Result.ok();
    }

    public updateSkus(skus: ProductSkus): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(skus, "Product Skus");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        this.props.skus = skus;
        super.update();
        return Result.ok();
    }

    public updateCategoryId(id: string): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(id, "Category Id");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }

        this.props.categoryId = id;
        super.update();
        return Result.ok();
    }

    // For example: I have a price $80 and discount 20% => sale price is $60
    public getSalePrice() {
        const price = this.props.price.value;
        const discountPercent = this.props.discountPercent.value;
        return price - (discountPercent * price) / 100;
    }
}