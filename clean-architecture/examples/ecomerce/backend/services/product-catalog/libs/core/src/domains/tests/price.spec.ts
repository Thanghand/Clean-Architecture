import { ProductPrice } from "../product-price";

describe('ProductPrice', () => {
    it('should create successfully when value of price is valid', () => {
        const value = 100;
        const priceOrError = ProductPrice.create(value);
        const price = priceOrError.getValue();

        expect(priceOrError.isSuccess).toEqual(true);
        expect(price.value).toEqual(value);
    })

    it('should create failed when value of price is smaller than 0', () => {
        const value = -10;
        const priceOrError = ProductPrice.create(value);

        expect(priceOrError.isFailure).toEqual(true);
    });

    it('should create failed when value is null', () => {
        const value = null;
        const priceOrError = ProductPrice.create(value);

        expect(priceOrError.isFailure).toEqual(true);
    });
});