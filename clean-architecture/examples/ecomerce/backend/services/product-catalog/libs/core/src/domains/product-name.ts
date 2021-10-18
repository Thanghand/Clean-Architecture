import { GuardUtil, Result } from "company-core";

export class ProductName {

    static maxLength = 100;
    static minLength = 5;

    private constructor(public readonly value: string) { }

    public static create(value: string): Result<ProductName> {

        const result = GuardUtil.againstNullOrUndefined(value, 'Product Name');
        if (!result.succeeded) {
            return Result.fail(result.message);
        }

        const minLengthResult = GuardUtil.againstAtLeast(this.minLength, value);
        if (!minLengthResult.succeeded)
            return Result.fail(minLengthResult.message)

        const maxLengthResult = GuardUtil.againstAtMost(this.maxLength, value);
        if (!maxLengthResult.succeeded)
            return Result.fail(maxLengthResult.message);

        return Result.ok(new ProductName(value));
    }
}