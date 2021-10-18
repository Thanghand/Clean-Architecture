import { GuardUtil, Result } from "company-core";

export class ProductDescription {

    static maxLength = 2000;
    static minLength = 100;
    private constructor(public readonly value: string) { }

    public static create(value: string): Result<ProductDescription> {

        const guardResult = GuardUtil.againstNullOrUndefined(value, 'Product Description');
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message);
        }   

        const minLengthResult = GuardUtil.againstAtLeast(this.minLength, value);
        if (!minLengthResult.succeeded)
            return Result.fail(minLengthResult.message)

        const maxLengthResult = GuardUtil.againstAtMost(this.maxLength, value);
        if (!maxLengthResult.succeeded)
            return Result.fail(maxLengthResult.message);

        if (this.hasScriptTag(value)) {
            return Result.fail('Sorry the description has some script tag');
        }
        
        return Result.ok(new ProductDescription(value));
    }

    private static hasScriptTag(value: string) {
        return value.includes('<script>');
    }

}