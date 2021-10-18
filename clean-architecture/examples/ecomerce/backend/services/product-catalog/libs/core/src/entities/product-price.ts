import { GuardArgumentCollection, GuardUtil, Result } from "company-core";

export class ProductPrice {

    private constructor(public readonly value: number) {}

    public static create(price: number): Result<ProductPrice> {
        const guardCollections: GuardArgumentCollection = [
            {
                argument: price,
                argumentName: 'Price'
            },
        ];
        const result = GuardUtil.againstNullOrUndefinedBulk(guardCollections);
        if (!result.succeeded) {
            return Result.fail(result.message);
        }

        if (price < 0) {
            return Result.fail('Sorry price cannot be smaller than 0');
        }

        return Result.ok(new ProductPrice(price));
    }
}