import { DiscountPercent } from "../discount-percent";

describe('DiscountPercent', () => {
    it ('should create successfully when percent is inRange', () => {

        const percent = 30;
        const discountPercentOrError = DiscountPercent.create(percent);
        const discountPercent = discountPercentOrError.getValue();

        expect(discountPercentOrError.isSuccess).toEqual(true);
        expect(discountPercent.value).toEqual(percent);
    });

    it ('should create fail when percent is not inRange', () => {

        const percent = 60;
        const discountPercentOrError = DiscountPercent.create(percent);

        expect(discountPercentOrError.isFailure).toEqual(true);
    });

    it('should create fail when percent is null', () => {
        const percent = null;
        const discountPercentOrError = DiscountPercent.create(percent);

        expect(discountPercentOrError.isFailure).toEqual(true);
    })

})