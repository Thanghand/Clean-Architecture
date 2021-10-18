import { GuardUtil, Result } from "company-core";
import { ProductSku } from "./product-sku";

export class ProductSkus {

    constructor(private _value: ProductSku[]) {
    }

    get value() {
        return this._value.map(v => v);
    }

    public static create(value: ProductSku[]): Result<ProductSkus> {

        const guardResult = GuardUtil.againstNullOrUndefined(value, 'Product Skus');
        if (!guardResult.succeeded) {
            return Result.fail(guardResult.message);
        }
        return Result.ok(new ProductSkus(value));
    }

    public addNewSku(sku: ProductSku): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(sku, "Product sku");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        const isSkuExisted = this._value.find(s => s.id === sku.id) !== undefined;
        if (isSkuExisted) {
            return Result.fail('Sku is existed');
        }
        this._value.push(sku);
        return Result.ok();
    }

    public updateSku(sku: ProductSku): Result<void> {
        const result = GuardUtil.againstNullOrUndefined(sku, "Product sku");
        if (!result.succeeded) {
            return Result.fail(result.message);
        }
        const isSkuNotExisted = this._value.find(s => s.id === sku.id) === undefined;
        if (isSkuNotExisted) {
            return Result.fail('Sku is not existed');
        }

        const newSkus = this._value.filter(s => s.id !== sku.id);
        newSkus.push(sku);
        this._value = newSkus;
        return Result.ok();
    }

    public deleteSku(id: string): Result<void> {

        const isSkuNotExisted = this._value.find(s => s.id === id) === undefined;
        if (isSkuNotExisted) {
            return Result.fail('Sku is not existed');
        }
        const newSkus = this._value.filter(s => s.id !== id);
        this._value = newSkus;
        return Result.ok();
    }
}