import { ProductStatus } from "../product-status";

describe('ProductStatus', () => {
    it('should create successfully when the value is valid', () => {
        const value = 'WAITING_FOR_APPROVE';
        const statusOrError = ProductStatus.create(value);
        const status = statusOrError.getValue();

        expect(statusOrError.isSuccess).toEqual(true);
        expect(status.value).toEqual(value);
    });

    it('should create failed when the value is not existed', () => {
        const value = 'ON_HOLD';
        const statusOrError = ProductStatus.create(value);
        
        expect(statusOrError.isFailure).toEqual(true);
    });

    it('should create failed when the value is null', () => {
        const statusOrError = ProductStatus.create(null);

        expect(statusOrError.isFailure).toEqual(true);
    });
});