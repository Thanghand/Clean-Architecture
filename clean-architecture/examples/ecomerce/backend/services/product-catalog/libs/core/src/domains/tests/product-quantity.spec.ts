import { ProductQuantity } from "../product-quantity";

describe('ProductQuantity', () => {
    it('should create successfully when value is valid', () => {
        const value = 10;
        const quantityOrError = ProductQuantity.create(value);
        const quantity = quantityOrError.getValue();

        expect(quantityOrError.isSuccess).toEqual(true);
        expect(quantity.value).toEqual(value);
    });

    it('should create failed when value is null', () => {
        const quantityOrError = ProductQuantity.create(null);
        
        expect(quantityOrError.isFailure).toEqual(true);
    });

    it('should create failed when value is smaller than 0', () => {
        const value = -1;
        const quantityOrError = ProductQuantity.create(value);

        expect(quantityOrError.isFailure).toEqual(true);
    });
});