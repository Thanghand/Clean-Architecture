import { GuardUtil, Result } from "company-core";

export class ProductQuantity {

    private constructor(public readonly value: number) {}

    public static create(value: number): Result<ProductQuantity> {

        const result = GuardUtil.againstNullOrUndefined(value, 'Product Quantity');
        if (!result.succeeded) {
            return Result.fail(result.message);
        }

        if (value < 0) {
            return Result.fail('Product quantity cannot be smaller than 0');
        }

        return Result.ok(new ProductQuantity(value));
    }

} 