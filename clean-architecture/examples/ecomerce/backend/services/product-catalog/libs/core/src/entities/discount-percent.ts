import { GuardUtil, Result } from "company-core";

export class DiscountPercent {

    static minimumToDiscount = 0;
    static maximumToDiscount = 45;

    private constructor(public readonly value: number) { }

    public static create(percent: number): Result<DiscountPercent> {

        const guardResult = GuardUtil.againstNullOrUndefined(percent, 'Discount Percent');
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message);
        }

        const result = GuardUtil.inRange(percent, this.minimumToDiscount, this.maximumToDiscount, 'Discount percent');
        if (!result.succeeded) {
            return Result.fail<DiscountPercent>(result.message);
        }
        return Result.ok<DiscountPercent>(new DiscountPercent(percent));
    }
}