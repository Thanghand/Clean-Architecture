import { ProductName } from "../product-name";

const descriptionData = `

`

describe('ProductName', () => {
    it('should create successfully when value is valid', () => {
        const value = 'Iphone 6';
        const nameOrError = ProductName.create(value);
        const name = nameOrError.getValue();

        expect(nameOrError.isSuccess).toEqual(true);
        expect(name.value).toEqual(value);
    });

    it('should create failed when value is smaller than the minimum rule', () => {
        const value = 'Sam';
        const nameOrError = ProductName.create(value);

        expect(nameOrError.isFailure).toEqual(true);
    });

    it('should create failed when length of value is bigger than the maximum rule', () => {
        const value = `Product details of IPHONE 6
            Freshness Promise
            Delivered at least 6 Days before it expires (including delivery day), or you can get a refund.
            If you are not satisfied with this product in any way, please contact us and we'll give you a refund. Find out more about our freshness promise.
            About Product
            Made from 100% fresh milk.Pasteurised and homogenised. Contains all the natural goodness of fresh cow’s milk with a superior taste
            Dietary Needs
            Healthier Choice`;

        const nameOrError = ProductName.create(value);

        expect(nameOrError.isFailure).toEqual(true);
    });

    it('should create failed when value is null', () => {
        const value = null;
        const nameOrError = ProductName.create(value);

        expect(nameOrError.isFailure).toEqual(true);
    });
});