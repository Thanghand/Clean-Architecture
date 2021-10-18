import { GuardUtil, Result } from "company-core";

export class ProductStatus {
    
    private constructor(public readonly value: string) {}
    
    private static statuses = ['WAITING_FOR_APPROVE', 'ACTIVE', 'IN_ACTIVE', 'DELETED'];

    public static create(value: string): Result<ProductStatus> {
        
        const result = GuardUtil.againstNullOrUndefined(value, 'Product status');
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        
        const isStatusNotExisted = !ProductStatus.statuses.includes(value);
        if (isStatusNotExisted)  {
            return Result.fail('Status is not existed');
        }

        return Result.ok(new ProductStatus(value));
    }

    public static WAITING_FOR_APPROVE = ProductStatus.create(ProductStatus.statuses[0]).getValue();
    public static ACTIVE = ProductStatus.create(ProductStatus.statuses[1]).getValue();
    public static IN_ACTIVE = ProductStatus.create(ProductStatus.statuses[2]).getValue();
    public static DELETED = ProductStatus.create(ProductStatus.statuses[3]).getValue();
}